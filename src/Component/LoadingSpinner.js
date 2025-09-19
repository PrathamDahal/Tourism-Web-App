import PropTypes from "prop-types";

const LoadingSpinner = ({ size = "medium", fullScreen = false }) => {
  const sizes = {
    small: "h-5 w-5 border-2",
    medium: "h-10 w-10 border-4",
    large: "h-16 w-16 border-8",
  };

  return (
    <div
      className={`${
        fullScreen ? "fixed inset-0 bg-black bg-opacity-30 z-50" : ""
      } flex items-center justify-center`}
    >
      <div
        className={`rounded-full border-t-transparent border-b-blue-500 border-l-blue-400 border-r-blue-300 border-solid ${sizes[size]} animate-spin shadow-md`}
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  fullScreen: PropTypes.bool,
};

export default LoadingSpinner;
