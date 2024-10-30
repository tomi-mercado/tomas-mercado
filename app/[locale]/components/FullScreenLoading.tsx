import { Spinner } from './Spinner';

export const FullScreenLoading = () => {
  return (
    <div className="min-h-screen relative -mt-[120px] flex items-center w-full justify-center">
      <Spinner size={150} />
    </div>
  );
};
