import { Link } from "react-router-dom";
import { FaTasks } from "react-icons/fa";

export const Home = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-zinc-600">
      <div className="flex items-center gap-1 text-5xl text-white">
        <FaTasks />
        <span className="font-semibold">Noted</span>
      </div>
      <div className="mt-6 flex gap-4">
        <Link to="/notes">
          <h3 className="text-xl text-white font-semibold">Notes</h3>
        </Link>
        <Link to="/account/profile">
          <h3 className="text-xl text-white font-semibold">Profile</h3>
        </Link>
        <Link to="/login">
          <h3 className="text-xl text-white font-semibold">Login</h3>
        </Link>
        <Link to="/register">
          <h3 className="text-xl text-white font-semibold">Sign Up</h3>
        </Link>
      </div>
    </div>
  );
};
