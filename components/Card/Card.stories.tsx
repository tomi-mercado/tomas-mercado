import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import Card from '.';
import Text from '../Text';

export default {
  title: 'Components/Card',
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => (
  <div className="p-4">
    <Card {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  children: <Text>Hello world</Text>,
};
