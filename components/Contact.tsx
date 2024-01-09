import readContent from 'services/content';
import { homeSchema } from 'utils/content/homeContentValidation';

import {
  FaGithub as GithubIcon,
  FaLinkedin as LinkedinIcon,
} from 'react-icons/fa';
import { MdEmail as EmailIcon } from 'react-icons/md';

import Link from 'next/link';

import SectionContainer from './SectionContainer';
import UnderlinedText from './UnderlinedText';

const Contact = async ({ locale }: { locale: 'es' | 'en' }) => {
  const {
    contact: { title, description, reachMe, linkedin, github, email },
  } = await readContent('content/home.json', locale, homeSchema);

  return (
    <SectionContainer>
      <h3 className="text-3xl">
        <UnderlinedText>{title}</UnderlinedText>
      </h3>

      <p>{description}</p>
      <p className="text-lg">{reachMe}</p>

      <div className="flex gap-4 items-center justify-between">
        <Link href={linkedin} target="_blank">
          <LinkedinIcon className="text-4xl" />
        </Link>
        <Link href={github} target="_blank">
          <GithubIcon className="text-4xl" />
        </Link>
        <Link href={`mailto:${email}`}>
          <EmailIcon className="text-4xl" />
        </Link>
      </div>
    </SectionContainer>
  );
};

export default Contact;
