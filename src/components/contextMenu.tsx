import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import useLogout from "../hooks/useLogout";

const ContextMenu = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const handleLogout = async () => {
    logout();
    navigate("/");
  };

  return (
    <div className="absolute top-12 right-0 flex flex-col items-center w-44 bg-white text-base transition-all duration-700 shadow-lg z-40">
      <Link to="/account/profile" className="w-full">
        <div className="font-semibold transition-all duration-300 hover:bg-gray-200 flex items-center gap-3 px-6 py-4 text-gray-500">
          <span className=" text-xl">
            <FaUserCircle />
          </span>
          <p>Profile</p>
        </div>
      </Link>

      <div className="w-11/12 border-t-2 border-gray-100"></div>

      <div
        className="w-full font-semibold transition-all duration-300 hover:bg-gray-200 flex items-center gap-3 px-6 py-4 text-gray-500"
        onClick={handleLogout}
      >
        <span className=" text-xl">
          <FaSignOutAlt />
        </span>
        <p>Sign Out</p>
      </div>
    </div>
  );
};

export default ContextMenu;
