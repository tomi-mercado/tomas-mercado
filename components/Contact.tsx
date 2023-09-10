import { useContent } from 'contexts/content';

import React from 'react';
import {
  FaGithub as GithubIcon,
  FaLinkedin as LinkedinIcon,
} from 'react-icons/fa';
import { MdEmail as EmailIcon } from 'react-icons/md';

import Link from 'next/link';

import SectionContainer from './SectionContainer';
import UnderlinedText from './UnderlinedText';

const Contact: React.FC = () => {
  const {
    content: {
      contact: { title, description, reachMe, email, github, linkedin },
    },
  } = useContent('Home');

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
