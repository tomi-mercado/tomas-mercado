import React from 'react';
import {
  FaGithub as GithubIcon,
  FaLinkedin as LinkedinIcon,
} from 'react-icons/fa';
import { MdEmail as EmailIcon } from 'react-icons/md';

import Link from 'next/link';

interface ContactProps {
  description: string;
  linkedin: string;
  github: string;
  email: string;
}

const Contact: React.FC<ContactProps> = ({
  description,
  email,
  github,
  linkedin,
}) => {
  return (
    <>
      <p className="text-lg">{description}</p>

      <div className="flex gap-4 items-center justify-between">
        <Link href={linkedin} target="_blank">
          <LinkedinIcon className="text-4xl" />
        </Link>
        <Link href={github} target="_blank">
          <GithubIcon className="text-4xl" />
        </Link>
        <a href={email}>
          <EmailIcon className="text-4xl" />
        </a>
      </div>
    </>
  );
};

export default Contact;
