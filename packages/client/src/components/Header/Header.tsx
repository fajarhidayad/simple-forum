import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import HeaderLink from "./HeaderLink";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import PopOverMenu from "./PopOverMenu";
import useClickOutside from "../../hooks/useClickOutside";
import { useAppSelector } from "../../app/hooks";
import { getUser } from "../../features/user/userSlice";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const { user } = useAppSelector(getUser);

  const menuRef = useRef<HTMLButtonElement | null>(null);

  const handleClickMenu = () => setMenu(!menu);

  useClickOutside(menuRef, () => setMenu(false));

  return (
    <header className="fixed w-full shadow bg-white z-10">
      <nav className="container flex justify-between py-5 md:py-0">
        <Link
          to="/"
          className="font-bold text-lg font-noto text-slate-700 self-center"
        >
          Twister
        </Link>

        <ul className="hidden md:flex space-x-10 items-center font-semibold text-sm py-7">
          <li>
            <HeaderLink href="/">Home</HeaderLink>
          </li>
          <li>
            <HeaderLink href="/explore">Explore</HeaderLink>
          </li>
          <li>
            <HeaderLink href="/bookmark">Bookmarks</HeaderLink>
          </li>
        </ul>

        {/* <a
          href="#"
          className="bg-blue-500 text-sm text-white font-noto font-medium px-6 py-2 rounded hover:bg-blue-600 transition-all duration-200 hidden md:block self-center"
        >
          Sign In
        </a> */}
        <button
          className="relative flex items-center space-x-2"
          onClick={handleClickMenu}
          ref={menuRef}
        >
          <div className="w-10 h-10 text-gray-700 rounded-full flex items-center justify-center font-bold">
            <FaUserCircle size={40} />
          </div>
          <h5 className="font-not font-bold">
            {user?.firstName} {user?.lastName}
          </h5>
          <IoMdArrowDropdown />
          <PopOverMenu active={menu} linkProfile={user?.username!} />
        </button>
      </nav>
    </header>
  );
};

export default Header;
