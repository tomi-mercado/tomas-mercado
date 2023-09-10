import { getCompletion } from 'services/openai';

const detectLanguage = async (text: string) => {
  const response = await getCompletion([
    {
      role: 'system',
      content: `Detect language of the provided texts. You should response only with the language, not anymore. For example "English" or "Spanish". If you have doubts, just return "English".`,
    },
    {
      role: 'user',
      content: text,
    },
  ]);

  return response
    .toLowerCase()
    .replace('.', '')
    .replace(`"`, '')
    .replace(`'`, '')
    .replace(' ', '');
};

export default detectLanguage;
