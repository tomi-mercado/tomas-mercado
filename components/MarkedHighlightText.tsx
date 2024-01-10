import { twMerge } from 'tailwind-merge';

interface MarkedHighlightTextProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  highlightColor?: `before:bg-${string}`;
}

const HiglightMarker = () => (
  <svg xmlns="//www.w3.org/2000/svg" version="1.1" className="hidden">
    <defs>
      <filter id="marker-shape">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0 0.15"
          numOctaves="1"
          result="warp"
        />
        <feDisplacementMap
          xChannelSelector="R"
          yChannelSelector="G"
          scale="30"
          in="SourceGraphic"
          in2="warp"
        />
      </filter>
    </defs>
  </svg>
);

const MarkedHighlightText: React.FC<MarkedHighlightTextProps> = ({
  children,
  highlightColor = 'before:bg-accent',
  className,
  ...props
}) => {
  return (
    <>
      <HiglightMarker />
      <span
        {...props}
        className={twMerge(
          'relative z-[1]',
          'before:content-[""]',
          highlightColor,
          'before:w-[110%]',
          'before:h-[1em]',
          'before:absolute',
          'before:-z-10',
          'before:marker-shape',
          'before:-left-[0.2em]',
          'before:top-[0.1em]',
          'before:px-[0.5em]',
          'before:pb-[1.2em]',
          className,
        )}
      >
        {children}
      </span>
    </>
  );
};

export default MarkedHighlightText;
