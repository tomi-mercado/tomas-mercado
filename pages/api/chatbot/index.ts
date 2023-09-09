import detectLanguage from 'chatbot/detectLanguage';
import getResponse from 'chatbot/getResponse';
import translate from 'chatbot/translate';

import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
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

  try {
    const userLanguage = await detectLanguage(prompt);
    const translatedPrompt = await translate(prompt, userLanguage, 'english');
    const response = await getResponse(translatedPrompt);

    if (userLanguage === 'english') {
      return res.status(200).json({ response });
    }

    const translatedResponse = await translate(
      response,
      'english',
      userLanguage,
    );

    return res.status(200).json({ response: translatedResponse });
  } catch (e) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default handler;
