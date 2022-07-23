import { CgSpinner } from "react-icons/cg";

interface LoadingProps {
  isLoading: boolean;
  size: number;
  children?: React.ReactNode;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({
  isLoading,
  children,
  size,
  className,
}) => {
  return (
    <div className={className}>
      {isLoading ? (
        <CgSpinner className="animate-spin" size={size} />
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

export default Loading;
