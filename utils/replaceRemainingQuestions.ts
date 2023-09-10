const neccesaryKey = '[remaining]';
const replaceRemainingQuestions = (text: string, amount: number) =>
  text.replace(neccesaryKey, amount.toString());

export default replaceRemainingQuestions;
