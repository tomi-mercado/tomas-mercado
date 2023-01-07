import Layout from 'components/Layout';

import React from 'react';

import { Content, ContentProps, Side, SideProps } from './components';

const contents: (Omit<ContentProps, 'rightButton' | 'leftButton'> & {
  image: SideProps['images'][0];
})[] = [
  {
    title: 'Experience',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero libero quaerat odit molestias aliquid repellat, hic facilis rem a vel ullam aperiam nostrum debitis voluptatum? Numquam delectus illum sit at!',
    image: {
      src: '/experience-first-image.png',
      alt: 'Illustration',
    },
  },
  {
    title: 'Aerolab',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero libero quaerat odit molestias aliquid repellat, hic facilis rem a vel ullam aperiam nostrum debitis voluptatum? Numquam delectus illum sit at!',
    image: {
      src: '/aerolab-logo.png',
      alt: 'Aerolab Logo',
    },
  },
  {
    title: 'Henry',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero libero quaerat odit molestias aliquid repellat, hic facilis rem a vel ullam aperiam nostrum debitis voluptatum? Numquam delectus illum sit at!',
    image: {
      src: '/henry-logo.png',
      alt: 'Henry Logo',
    },
  },
];

const Experience: React.FC = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const contentsProps = contents.map((content, index) => {
    const isIddle = index === 0;

    return {
      ...content,
      rightButton: {
        label: isIddle ? 'Where I was working' : 'Next',
        onClick: () =>
          setCurrentIndex((prev) => {
            if (prev === contents.length - 1) {
              return 0;
            }

            return prev + 1;
          }),
      },
      leftButton: isIddle
        ? undefined
        : {
            label: 'Previous',
            onClick: () =>
              setCurrentIndex((prev) => {
                if (prev === 0) {
                  return contents.length - 1;
                }

                return prev - 1;
              }),
          },
    };
  });

  const contentProps = contentsProps[currentIndex];
  const images = contentsProps.map((content) => content.image);

  return (
    <Layout
      sideComponent={<Side images={images} currentIndex={currentIndex} />}
    >
      <Content {...contentProps} />
    </Layout>
  );
};

export default Experience;
