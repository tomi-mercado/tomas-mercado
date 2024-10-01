import MarkedHighlightText from 'components/MarkedHighlightText';
import SectionContainer from 'components/SectionContainer';
import { HomeContent } from 'utils/content/homeContentValidation';
import { Locale } from 'utils/locales';

import { FaCalendar } from 'react-icons/fa';

import Image from 'next/image';

const parseDate = (date: string, locale: string) => {
  return new Date(`${date}-01:00:00:00`).toLocaleDateString(locale, {
    month: 'short',
    year: 'numeric',
  });
};

const Experience = async ({
  jobs,
  title,
  description,
  locale,
  presentLabel,
}: HomeContent['experience'] & {
  locale: Locale;
}) => {
  return (
    <SectionContainer innerClassName="w-full">
      <h3 className="text-3xl">
        <MarkedHighlightText>{title}</MarkedHighlightText>
      </h3>

      <p>{description}</p>

      <div className="flex flex-col gap-5 w-full items-center">
        {jobs.map(
          ({
            companyName,
            companyLink,
            companyLogo,
            position,
            description,
            ...dates
          }) => {
            const from = parseDate(dates.from, locale);
            const to =
              dates.to !== 'Present'
                ? parseDate(dates.to, locale)
                : presentLabel;

            return (
              <div
                key={companyName}
                className="bg-base-100 rounded-lg p-6 shadow-lg text-left"
              >
                <div className="flex items-center mb-4">
                  <Image
                    src={companyLogo.src}
                    alt={companyLogo.alt}
                    className="w-12 h-12 rounded-full mr-4"
                    width={48}
                    height={48}
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{companyName}</h3>
                    <p>{position}</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <FaCalendar className="w-5 h-5 mr-2" />
                  <span>
                    {from} - {to}
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-2">
                  {description.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            );
          },
        )}
      </div>
    </SectionContainer>
  );
};

export default Experience;
