export const Spinner = ({ size = 45 }: { size?: number }) => {
  // @ts-expect-error in the future I'll add the declare for this
  return <l-helix size={size} speed="2.5" color="white" />;
};
