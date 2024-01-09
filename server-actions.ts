'use server';

import detectLanguage from 'chatbot/detectLanguage';
import getResponse from 'chatbot/getResponse';
import translate from 'chatbot/translate';
import { getAuth0User, getCredits, updateCredits } from 'services/auth';

import { getSession } from '@auth0/nextjs-auth0';
import { revalidatePath } from 'next/cache';

const DEBUGGING = process.env.DEBUGGING_TOMBOT;

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

const isCurrentlyGettingResponse: Record<string, boolean> = {};
const responsesCache: Record<string, string> = {};

export const askToTombot = async (prompt: string) => {
  const session = await getSession();

  if (!session) {
    throw new Error('No session found');
  }

  const user = await getAuth0User(session.user.sub);
  const credits = await getCredits(user);

  if (DEBUGGING) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    revalidatePath('/');
    return prompt;
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
