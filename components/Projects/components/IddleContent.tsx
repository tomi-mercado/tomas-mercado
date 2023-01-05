import { AiOutlineArrowRight } from 'react-icons/ai';

import { Button, Text } from '@components';

interface IddleContentProps {
  onClick: () => void;
}

const IddleContent: React.FC<IddleContentProps> = ({ onClick }) => {
  return (
    <>
      <div className="flex flex-col space-y-2">
        <Text underline as="h3" variant="h3">
          Projects
        </Text>

        <Text>
          In this section, you will find a selection of my most notable web
          development projects. Each project showcases my ability to create
          visually stunning, user-friendly websites and web applications that
          meet the needs of my clients and users.
        </Text>
      </div>

      <div className="flex justify-end">
        <Button rightIcon={<AiOutlineArrowRight />} onClick={onClick}>
          See my projects
        </Button>
      </div>
    </>
  );
};

export default IddleContent;
