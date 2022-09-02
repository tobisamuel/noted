import { FaTasks } from "react-icons/fa";

const Logo = () => {
  return (
    <div className="flex items-center gap-1 text-3xl text-zinc-600">
      <FaTasks />
      <span className="font-semibold">Noted</span>
    </div>
  );
};

export default Logo;
