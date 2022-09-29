import { useEffect, useRef, useState } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import ContextMenu from "./contextMenu";

type IconProps = { icon: JSX.Element };

const NavbarIcon = ({ icon }: IconProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useOutsideClick(menuRef, closeMenu);

  return (
    <div className="relative group cursor-pointer transition-all duration-300">
      <span
        className="text-2xl text-white"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {icon}
      </span>

      {menuOpen ? (
        <div ref={menuRef}>
          <ContextMenu />
        </div>
      ) : null}
    </div>
  );
};

export default NavbarIcon;
