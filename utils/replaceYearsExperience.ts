import { useEffect, useState } from 'react';

const necessaryKey = '[yearsExperience]';
const startDate = new Date(2020, 8, 3);
const today = new Date();
const replaceYearsExperience = (text?: string) => {
  const years = today.getFullYear() - startDate.getFullYear();
  if (!text) {
    return `${years}+`;
  }

  if (!text.includes(necessaryKey)) {
    throw new Error(
      `The text passed to replaceYearsExperience must include the string "${necessaryKey}"`,
    );
  }

  return text.replace(necessaryKey, `${years}+`);
};

export const useReplaceYearsExperienceOnClient = (text: string) => {
  const [yearsExperience, setYearsExperience] = useState<string>('');

  useEffect(() => {
    setYearsExperience(replaceYearsExperience(text));
  }, [text]);

  return yearsExperience;
};

export default replaceYearsExperience;
