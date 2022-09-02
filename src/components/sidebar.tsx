import { useState } from "react";
import { FaBars, FaSignOutAlt, FaTasks, FaUser } from "react-icons/fa";
import { FcTodoList } from "react-icons/fc";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`min-h-screen p-9 flex flex-col justify-between ${
        isOpen ? "w-72" : "w-24"
      } bg-black transition ease-in-out duration-300`}
    >
      <div className="flex flex-col gap-5 text-2xl text-white">
        <div className="flex py-2">
          <div className={`flex items-center gap-1 text-2xl`}>
            <FaTasks />
            <FaBars onClick={toggleSideBar} />

            {/* <span className="hover:block font-semibold">Todo</span> */}
          </div>
        </div>
      </div>
      <button className="text-white text-2xl">
        <FaSignOutAlt />
      </button>
    </div>
  );
};

export default Sidebar;
