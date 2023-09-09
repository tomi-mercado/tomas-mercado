const necessaryKey = '[yearsExperience]';
const startDate = new Date('2020-08-03:');
const today = new Date();
const replaceYearsExperience = (text: string) => {
  if (!text.includes(necessaryKey)) {
    throw new Error(
      `The text passed to replaceYearsExperience must include the string "${necessaryKey}"`,
    );
  }

  const years = today.getFullYear() - startDate.getFullYear();

  return text.replace(necessaryKey, `${years}+`);
};

export default replaceYearsExperience;
