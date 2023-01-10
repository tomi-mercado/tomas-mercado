import { AiOutlineArrowRight } from 'react-icons/ai';

import { Button, Text } from '@components';

interface IddleContentProps {
  title: string;
  description: string;
  buttonLabel: string;
  onClick: () => void;
}

const IddleContent: React.FC<IddleContentProps> = ({
  title,
  description,
  buttonLabel,
  onClick,
}) => {
  return (
    <>
      <div className="flex flex-col space-y-2">
        <Text underline as="h3" variant="h3">
          {title}
        </Text>

        <Text>{description}</Text>
      </div>

      <div className="flex justify-end">
        <Button
          variant="secondary"
          rightIcon={<AiOutlineArrowRight />}
          onClick={onClick}
        >
          {buttonLabel}
        </Button>
      </div>
    </>
  );
};

export default IddleContent;
