import { useEffect, useRef, useState } from "react";
import ContextMenu from "./contextMenu";

type IconProps = { icon: JSX.Element };

const NavbarIcon = ({ icon }: IconProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside({ target }: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className="relative group cursor-pointer transition-all duration-300">
      <span
        className="text-2xl text-white"
        onClick={() =>
          setMenuOpen((prev) => {
            return !prev;
          })
        }
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
