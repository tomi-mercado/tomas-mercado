import React from 'react';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { IoMdMail } from 'react-icons/io';

import { Layout, Text } from '@components';

interface SocialMediaItemProps {
  icon: React.ReactNode;
  link: string;
  text: string;
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
      <Text>Contact me:</Text>

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

const Contact: React.FC = () => {
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
        <div className="flex flex-col space-y-4">
          <Text variant="h3" underline>
            Get in touch
          </Text>

          <Text>
            {`If you have any questions or inquiries
          about my work, please don't hesitate to reach out. You can contact me
          via email or Linkedin, and I'll do my best to get back to you as soon as
          possible. Feel free to follow me on LinkedIn to stay up-to-date on my work.
          Thank you for visiting my portfolio website. I'm always open to new
          collaborations, so don't hesitate to get in touch. I look forward to hearing from you!`}
          </Text>

          <SocialMedia />
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
