'use server';

import detectLanguage from 'chatbot/detectLanguage';
import getResponse from 'chatbot/getResponse';
import translate from 'chatbot/translate';
import { getAuth0User, getCredits, updateCredits } from 'services/auth';

import { getSession } from '@auth0/nextjs-auth0';
import { revalidatePath } from 'next/cache';

// const handler = withApiAuthRequired(
//   async (req: NextApiRequest, res: NextApiResponse) => {
//     if (req.method !== 'POST') {
//       return res.status(405).json({ message: 'Method not allowed' });
//     }

//     const prompt = req.body.prompt;

//     if (!prompt) {
//       return res.status(400).json({ message: 'Missing prompt' });
//     }

//     if (typeof prompt !== 'string') {
//       return res.status(400).json({ message: 'Prompt should be a string' });
//     }

//     if (prompt.length > 280) {
//       return res.status(400).json({ message: 'Prompt too long' });
//     }

//     if (DEBUGGING) {
//       return res.status(200).json({ response: 'Hello!' });
//     }

//     const user = await getUser(req, res);
//     const credits = await getCredits(user);

//     if (credits < 1) {
//       return res.status(402).json({ message: 'Not enough credits' });
//     }

//     if (isCurrentlyGettingResponse[user.userId]) {
//       return res.status(429).json({ message: 'Too many requests' });
//     }

//     isCurrentlyGettingResponse[user.userId] = true;

//     if (responsesCache[prompt]) {
//       await preResponse(user.userId, credits);
//       return res.status(200).json({ response: responsesCache[prompt] });
//     }

//     try {
//       const userLanguage = await detectLanguage(prompt);
//       const translatedPrompt = await translate(prompt, userLanguage, 'english');
//       const response = await getResponse(translatedPrompt);

//       if (userLanguage === 'english') {
//         await preResponse(user.userId, credits, prompt, response);
//         return res.status(200).json({ response });
//       }

//       const translatedResponse = await translate(
//         response,
//         'english',
//         userLanguage,
//       );

//       await preResponse(user.userId, credits, prompt, translatedResponse);
//       return res.status(200).json({ response: translatedResponse });
//     } catch (e) {
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//   },
// );

const preResponse = async (
  userId: string,
  credits: number,
  prompt?: string,
  response?: string,
) => {
  await updateCredits(userId, credits - 1);
  isCurrentlyGettingResponse[userId] = false;

  if (prompt && response) {
    responsesCache[prompt] = response;
  }
};

const validatePrompt = (prompt: FormDataEntryValue | null) => {
  if (!prompt) {
    throw new Error('Missing prompt');
  }

  if (typeof prompt !== 'string') {
    throw new Error('Prompt should be a string');
  }

  if (prompt.length > 280) {
    throw new Error('Prompt too long');
  }

  return prompt;
};

const isCurrentlyGettingResponse: Record<string, boolean> = {};
const responsesCache: Record<string, string> = {};

export const askToTombot = async (formData: FormData) => {
  const session = await getSession();

  if (!session) {
    throw new Error('No session found');
  }

  const user = await getAuth0User(session.user.sub);
  const credits = await getCredits(user);

  const prompt = validatePrompt(formData.get('question'));

  if (true) {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return 'Buenas buenas,,';
  }

  if (credits < 1) {
    throw new Error('Not enough credits');
  }

  if (isCurrentlyGettingResponse[user.user_id]) {
    throw new Error('Too many requests');
  }

  isCurrentlyGettingResponse[user.user_id] = true;

  if (responsesCache[prompt]) {
    await preResponse(user.user_id, credits);
    return responsesCache[prompt];
  }

  try {
    const userLanguage = await detectLanguage(prompt);
    const translatedPrompt = await translate(prompt, userLanguage, 'english');
    const response = await getResponse(translatedPrompt);

    if (userLanguage === 'english') {
      await preResponse(user.user_id, credits, prompt, response);
      return response;
    }

    const translatedResponse = await translate(
      response,
      'english',
      userLanguage,
    );

    await preResponse(user.user_id, credits, prompt, translatedResponse);
    revalidatePath('/');
    return translatedResponse;
  } catch (e) {
    throw new Error('Internal server error');
  }
};
