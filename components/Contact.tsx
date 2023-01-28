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
  locale: 'en' | 'es';
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
    <div className="flex flex-col space-y-3">
      <div className="w-[300px]">
        <div className="grid grid-cols-[1fr,5fr] gap-y-2">
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
      </div>
    </div>
  );
};

const Contact: React.FC<ContactProps> = ({ title, description, locale }) => {
  return (
    <Layout
      id="contact"
      image={{
        src: '/contact-side-image.png',
        alt: 'Illustration of an eye and phone',
        className: 'object-contain',
      }}
      locale={locale}
    >
      <div className="flex flex-col space-y-4 items-center px-6 lg:px-8 py-4 md:min-h-[inherit] h-full md:justify-center lg:h-[80%]">
        <div className="flex flex-col space-y-4">
          <Text variant="h3" underline>
            {title}
          </Text>

          <Text>{description}</Text>

          <SocialMedia />
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
