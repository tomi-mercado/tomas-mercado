'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

const TIME_TO_SWAP = 5000;
const SwapImage: React.FC<{
  image: {
    src: string;
    alt: string;
  };
}> = ({ image }) => {
  const [swap, setSwap] = useState(false);

  const lastSwapTime = useRef(Date.now());

  const toggleSwap = () => {
    setSwap((prev) => !prev);
    lastSwapTime.current = Date.now();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastSwapTime.current < TIME_TO_SWAP) {
        return;
      }

      toggleSwap();
    }, TIME_TO_SWAP);

    return () => clearInterval(interval);
  }, []);

  return (
    <label className="swap swap-flip">
      <input type="checkbox" checked={swap} onChange={toggleSwap} />

      <div className="swap-on">
        <div className="rounded-full w-[160px] h-[160px] bg-secondary relative">
          <Image
            src={image.src}
            alt={image.alt}
            width={150}
            height={150}
            priority
            className="rounded-full w-[150px] h-[150px] object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>
      <div className="swap-off">
        <div className="rounded-full w-[160px] h-[160px] bg-secondary relative">
          <Image
            src="/logo.png"
            alt="Logo of Tom: The food is pizza, the club is Quilmes, and the code is TypeScript"
            width={184}
            height={184}
            priority
            className="rounded-full w-[184px] h-[184px] object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>
    </label>
  );
};

export default SwapImage;
