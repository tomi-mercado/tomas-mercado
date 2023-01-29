import React from 'react';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { IoMdMail } from 'react-icons/io';

import { Layout, Text } from '@components';

interface SocialMediaItemProps {
  icon: React.ReactNode;
  link: string;
  text: string;
}

export interface ContactProps {
  title: string;
  description: string;
}

const SocialMediaItem: React.FC<SocialMediaItemProps> = ({
  icon,
  link,
  text,
}) => {
  return (
    <>
      <a href={link} referrerPolicy="no-referrer">
        {icon}
      </a>
      <a href={link} referrerPolicy="no-referrer">
        <Text>{text}</Text>
      </a>
    </>
  );
};

const SocialMedia: React.FC = () => {
  return (
    <div className="grid grid-cols-[1fr,5fr] gap-y-2 w-[300px] self-start">
      <SocialMediaItem
        icon={<BsLinkedin size={36} />}
        link="https://linkedin.com/in/tomas-mercado"
        text="/tomas-mercado"
      />

      <SocialMediaItem
        icon={<BsGithub size={36} />}
        link="https://github.com/tomi-mercado"
        text="/tomi-mercado"
      />

      <SocialMediaItem
        icon={<IoMdMail size={36} />}
        link="mailto:tmercadoslp@gmail.com"
        text="tmercadoslp@gmail.com"
      />
    </div>
  );
};

const Contact: React.FC<ContactProps> = ({ title, description }) => {
  return (
    <Layout
      id="contact"
      image={{
        src: '/contact-side-image.png',
        alt: 'Illustration of an eye and phone',
        className: 'object-contain',
      }}
    >
      <div className="flex flex-col space-y-4 items-center px-6 lg:px-8 py-4 md:min-h-[inherit] h-full md:justify-center lg:h-[80%]">
        <Text variant="h3" underline>
          {title}
        </Text>

        <Text>{description}</Text>

        <SocialMedia />
      </div>
    </Layout>
  );
};

export default Contact;
