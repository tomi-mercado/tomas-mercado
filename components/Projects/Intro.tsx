import UnderlinedText from 'components/UnderlinedText';
import { useContent } from 'contexts/content';

const Intro = () => {
  const {
    content: {
      main: { title, description },
    },
  } = useContent('Projects');

  return (
    <div className="w-full flex flex-col gap-2">
      <h1 className="text-center w-full text-3xl">
        <UnderlinedText>{title}</UnderlinedText>
      </h1>
      <p className="text-center w-full text-sm lg:text-base">{description}</p>
    </div>
  );
};

export default Intro;
