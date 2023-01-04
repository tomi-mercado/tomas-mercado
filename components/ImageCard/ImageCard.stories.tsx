import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import ImageCard from '.';

export default {
  title: 'Components/ImageCard',
  component: ImageCard,
} as ComponentMeta<typeof ImageCard>;

const Template: ComponentStory<typeof ImageCard> = (args) => (
  <div className="p-4">
    <ImageCard {...args} />
  </div>
);

export const LandscapeSmall = Template.bind({});
LandscapeSmall.args = {
  image: {
    src: 'https://picsum.photos/400/160',
    alt: 'Image',
  },
  size: 'sm',
  view: 'landscape',
};

export const LandscapeMedium = Template.bind({});
LandscapeMedium.args = {
  image: {
    src: 'https://picsum.photos/400/160',
    alt: 'Image',
  },
  size: 'md',
  view: 'landscape',
};

export const LandscapeLarge = Template.bind({});
LandscapeLarge.args = {
  image: {
    src: 'https://picsum.photos/400/160',
    alt: 'Image',
  },
  size: 'lg',
  view: 'landscape',
};

export const PortraitSmall = Template.bind({});
PortraitSmall.args = {
  image: {
    src: 'https://picsum.photos/400',
    alt: 'Image',
  },
  size: 'sm',
  view: 'portrait',
};

export const PortraitMedium = Template.bind({});
PortraitMedium.args = {
  image: {
    src: 'https://picsum.photos/400',
    alt: 'Image',
  },
  size: 'md',
  view: 'portrait',
};

export const PortraitLarge = Template.bind({});
PortraitLarge.args = {
  image: {
    src: 'https://picsum.photos/400',
    alt: 'Image',
  },
  size: 'lg',
  view: 'portrait',
};
