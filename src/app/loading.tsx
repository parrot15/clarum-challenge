import Spinner from '@/components/Spinner';

/**
 * Loading component for the home page. Displays a
 * full-screen spinner.
 */
const Loading = () => {
  return (
    <div className="h-screen">
      <Spinner size="large" />
    </div>
  );
};
export default Loading;
