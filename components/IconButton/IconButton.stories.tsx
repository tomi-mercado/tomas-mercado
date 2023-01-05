import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

import IconButton from '.';

export default {
  title: 'Components/IconButton',
  component: IconButton,
  argTypes: {
    size: {
      control: false,
    },
    variant: {
      control: false,
    },
    icon: {
      control: false,
    },
  },
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = (args) => {
  const sizes = ['xs', 'sm', 'md', 'lg'];

  return (
    <div className="flex space-x-4">
      {sizes.map((size) => (
        <IconButton
          key={`${args.variant}-${args.size}`}
          {...args}
          size={size as 'xs' | 'sm' | 'md' | 'lg'}
        />
      ))}
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  icon: <FaArrowRight />,
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  icon: <FaArrowRight />,
  variant: 'secondary',
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  icon: <FaArrowRight />,
  variant: 'tertiary',
};

export const Quaternary = Template.bind({});
Quaternary.args = {
  icon: <FaArrowRight />,
  variant: 'quaternary',
};
