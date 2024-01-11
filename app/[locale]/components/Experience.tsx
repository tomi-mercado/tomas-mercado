import MarkedHighlightText from 'components/MarkedHighlightText';
import SectionContainer from 'components/SectionContainer';
import { HomeContent } from 'utils/content/homeContentValidation';

import Image from 'next/image';
import Link from 'next/link';

const parseDate = (date: string, locale: string) => {
  return new Date(`${date}-01:00:00:00`).toLocaleDateString(locale, {
    month: 'short',
    year: 'numeric',
  });
};

const Contact = async ({
  jobs,
  title,
  description,
  locale,
  presentLabel,
}: HomeContent['experience'] & {
  locale: 'en' | 'es';
}) => {
  return (
    <SectionContainer innerClassName="w-full">
      <h3 className="text-3xl">
        <MarkedHighlightText>{title}</MarkedHighlightText>
      </h3>

      <p>{description}</p>

      <div className="flex flex-col gap-5 w-full items-center">
        {jobs.map(
          ({ companyName, companyLink, companyLogo, position, ...dates }) => {
            const from = parseDate(dates.from, locale);
            const to =
              dates.to !== 'Present'
                ? parseDate(dates.to, locale)
                : presentLabel;

            return (
              <Link
                className="flex gap-2 items-start p-6 w-full bg-base-100 border-2 border-base-content rounded-sm"
                key={companyName}
                href={companyLink}
                target="_blank"
              >
                <Image
                  src={companyLogo.src}
                  alt={companyLogo.alt}
                  className="rounded-sm"
                  width={48}
                  height={48}
                />

                <div className="flex flex-col gap-1 text-left">
                  <span rel="noreferrer" className="text-lg font-semibold">
                    {companyName}
                  </span>
                  <span>{position}</span>
                  <span>
                    {from} - {to}
                  </span>
                </div>
              </Link>
            );
          },
        )}
      </div>
    </SectionContainer>
  );
};

export default Contact;
