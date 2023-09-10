import openai from 'config/openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat';
import { ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions';

export const getCompletion = async (
  messages: ChatCompletionMessageParam[],
  model: ChatCompletionCreateParamsBase['model'] = 'gpt-3.5-turbo',
) => {
  const completion = await openai.chat.completions.create({
    model,
    messages,
    max_tokens: 500,
  });

  const response = completion.choices[0].message.content;

  if (!response) {
    throw new Error('Empty response');
  }

  return response;
};
