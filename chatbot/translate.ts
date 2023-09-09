import { getCompletion } from 'services';

const translate = async (
  text: string,
  originalLanguage: string,
  toLanguage: string,
) => {
  const response = await getCompletion([
    {
      role: 'system',
      content: `You translate the messages from ${originalLanguage} to ${toLanguage}.`,
    },
    {
      role: 'user',
      content: text,
    },
  ]);

  return response;
};

export default translate;
