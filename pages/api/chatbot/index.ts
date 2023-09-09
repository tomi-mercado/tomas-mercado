import detectLanguage from 'chatbot/detectLanguage';
import getResponse from 'chatbot/getResponse';
import translate from 'chatbot/translate';
import { getCredits, getUser, updateCredits } from 'services/auth';

import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

const DEBUGGING = false;

const isCurrentlyGettingResponse: { [userId: string]: boolean } = {};

const handler = withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    const prompt = req.body.prompt;

    if (!prompt) {
      return res.status(400).json({ message: 'Missing prompt' });
    }

    if (typeof prompt !== 'string') {
      return res.status(400).json({ message: 'Prompt should be a string' });
    }

    if (prompt.length > 280) {
      return res.status(400).json({ message: 'Prompt too long' });
    }

    if (DEBUGGING) {
      return res.status(200).json({ response: 'Hello!' });
    }

    const user = await getUser(req, res);
    const credits = await getCredits(user);

    if (credits < 1) {
      return res.status(402).json({ message: 'Not enough credits' });
    }

    if (isCurrentlyGettingResponse[user.userId]) {
      return res.status(429).json({ message: 'Too many requests' });
    }

    try {
      const userLanguage = await detectLanguage(prompt);
      const translatedPrompt = await translate(prompt, userLanguage, 'english');
      const response = await getResponse(translatedPrompt);

      if (userLanguage === 'english') {
        await updateCredits(user.userId, credits - 1);
        isCurrentlyGettingResponse[user.userId] = false;
        return res.status(200).json({ response });
      }

      const translatedResponse = await translate(
        response,
        'english',
        userLanguage,
      );

      await updateCredits(user.userId, credits - 1);
      isCurrentlyGettingResponse[user.userId] = false;
      return res.status(200).json({ response: translatedResponse });
    } catch (e) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
);

export default handler;
