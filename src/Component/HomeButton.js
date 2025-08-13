import { useNavigate, useLocation } from "react-router-dom";
import { FiArrowLeft, FiHome } from "react-icons/fi";

const HomeButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show if already on home
  if (location.pathname === "/") return null;

  return (
    <div className="absolute bottom-20 right-20 group">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition relative"
      >
        <FiArrowLeft className="text-lg" />
        <FiHome className="text-2xl" />
      </button>

      {/* Tooltip */}
      <span className="absolute -top-8 right-1/2 translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
        Go Home
      </span>
    </div>
  );
};

export default HomeButton;
