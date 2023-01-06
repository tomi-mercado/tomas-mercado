import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

import { Button, Text } from '@components';

const Content: React.FC = () => {
  return (
    <div className="px-8 flex flex-col space-y-8 h-full min-h-[inherit] lg:min-h-fit lg:h-[70%] 2xl:h-[75%] w-full justify-center">
      <div className="flex flex-col space-y-4">
        <Text variant="h3" underline>
          Experience
        </Text>

        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis,
          quam nobis. Ipsam quisquam cumque ea fugiat commodi in facere nam
          beatae eveniet, voluptates quasi ab hic aspernatur officiis cum fugit.
        </Text>
      </div>

      <div className="w-full flex justify-end">
        <Button
          variant="secondary"
          rightIcon={<FaArrowRight />}
          className="w-fit"
        >
          Where I was working
        </Button>
      </div>
    </div>
  );
};

export default Content;
