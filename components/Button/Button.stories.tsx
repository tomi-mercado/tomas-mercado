import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import Button from '.';

export default {
  title: 'Components/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => {
  const sizes = ['xs', 'sm', 'md', 'lg'];

  return (
    <div className="flex space-x-4">
      {sizes.map((size) => (
        <Button
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
  children: 'Button',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Button',
  variant: 'secondary',
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  children: 'Button',
  variant: 'tertiary',
};

export const Quaternary = Template.bind({});
Quaternary.args = {
  children: 'Button',
  variant: 'quaternary',
};
