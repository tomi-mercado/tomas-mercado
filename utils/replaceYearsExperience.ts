'server-only';

import { differenceInDays } from 'date-fns';

const necessaryKey = '[yearsExperience]';
const startDate = new Date(2020, 8, 3);
const today = new Date();
const replaceYearsExperience = (text?: string) => {
  // const years = today.getFullYear() - startDate.getFullYear();
  const years = Math.floor(differenceInDays(today, startDate) / 365);
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

export default replaceYearsExperience;
