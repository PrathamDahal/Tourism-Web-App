import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiArrowLeft, FiHome } from "react-icons/fi";

const HomeButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showTooltip, setShowTooltip] = useState(false);

  
  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => setShowTooltip(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [showTooltip]);
  
  if (location.pathname === "/") return null;

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };
  return (
    <div className="fixed bottom-20 right-20">
      <button
        onClick={() => navigate("/")}
        onMouseEnter={handleMouseEnter}
        className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-xl 
                   hover:bg-red-700 opacity-50 hover:opacity-90 transition-all duration-200 relative"
      >
        <FiArrowLeft className="text-lg" />
        <FiHome className="text-2xl" />
      </button>

      {/* Tooltip */}
      <span
        className={`absolute -top-6 right-1/3 translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded 
                    opacity-0 scale-95 transition-all duration-200 pointer-events-none whitespace-nowrap
                    ${showTooltip ? "opacity-50 scale-100" : ""}`}
      >
        Go Home
      </span>
    </div>
  );
};

export default HomeButton;
