import React, { PropsWithChildren } from 'react';
import Slider, { Settings } from 'react-slick';

import classNames from 'classnames';

const Carousel: React.FC<PropsWithChildren> = ({ children }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    onSwipe: (dir) => {
      if (dir === 'left') {
        setCurrentSlide((prev) => {
          if (prev === React.Children.count(children) - 1) {
            return 0;
          }

          return prev + 1;
        });
      } else {
        setCurrentSlide((prev) => {
          if (prev === 0) {
            return React.Children.count(children) - 1;
          }

          return prev - 1;
        });
      }
    },
    customPaging: (i) => {
      return (
        <div
          className="flex justify-center items-center"
          onClick={() => setCurrentSlide(i)}
        >
          <div
            className={classNames([
              'w-2 h-2 bg-white rounded-full',
              {
                'bg-gray-500': i !== currentSlide,
              },
            ])}
            onClick={() => setCurrentSlide(i)}
          />
        </div>
      );
    },
    dotsClass: 'slick-dots !relative !bottom-0',
  };

  return (
    <>
      <style jsx global>{`
        .slick-track {
          display: flex;
          align-items: center;
        }
      `}</style>
      <Slider {...settings}>{children}</Slider>;
    </>
  );
};

export default Carousel;
