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
      contact: { description, email, github, linkedin },
    },
  } = useContent();

  return (
    <SectionContainer>
      <h3 className="text-3xl">
        <UnderlinedText>Contact</UnderlinedText>
      </h3>

      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi harum
        aperiam, aut earum repellat consectetur dolorum non, architecto
        distinctio nemo corporis ea sed. Voluptate in dolorum, perferendis
        possimus reiciendis nisi?
      </p>
      <p className="text-lg">{description}</p>

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
