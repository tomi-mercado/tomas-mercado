const neccesaryKey = '[maxQuestions]';
const replaceMaxQuestions = (text: string, amount: number) =>
  text.replace(neccesaryKey, amount.toString());

export default replaceMaxQuestions;
