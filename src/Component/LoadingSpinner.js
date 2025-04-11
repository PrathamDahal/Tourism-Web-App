import PropTypes from 'prop-types';

const LoadingSpinner = ({ size = 'medium', fullScreen = false }) => {
  const sizes = {
    small: 'h-5 w-5',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  };

  return (
    <div className={`flex items-center justify-center ${fullScreen ? 'h-screen w-screen' : ''}`}>
      <div
        className={`animate-spin rounded-full border-b-2 border-t-2 border-blue-500 ${sizes[size]}`}
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullScreen: PropTypes.bool
};

export default LoadingSpinner;