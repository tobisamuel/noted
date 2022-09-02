import { Link } from "react-router-dom";
import { FaTasks, FaUserCircle } from "react-icons/fa";
import NavbarIcon from "./navbarIcon";

const Navbar = () => {
  return (
    <nav>
      <div className="flex justify-between items-center px-4 py-5 bg-zinc-600 md:px-6">
        <Link to="/notes">
          <div className="flex items-center gap-1 text-3xl text-white">
            <FaTasks />
            <span className="font-semibold">Noted</span>
          </div>
        </Link>

        <div className="flex space-x-3 text-3xl text-white">
          <NavbarIcon icon={<FaUserCircle />} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
