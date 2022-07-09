import React from "react";
import HeaderLink from "./HeaderLink";

const Header = () => {
  return (
    <header className="fixed w-full shadow bg-white z-10">
      <nav className="container flex justify-between py-7 md:py-0">
        <a
          href="#"
          className="font-bold text-lg font-noto text-slate-700 self-center"
        >
          FunForum
        </a>

        <ul className="hidden md:flex space-x-10 items-center font-semibold text-sm py-7">
          <li>
            <HeaderLink href="#" active>
              Home
            </HeaderLink>
          </li>
          <li>
            <HeaderLink href="#">Explore</HeaderLink>
          </li>
          <li>
            <HeaderLink href="#">Bookmarks</HeaderLink>
          </li>
        </ul>

        {/* <a
          href="#"
          className="bg-blue-500 text-sm text-white font-noto font-medium px-6 py-2 rounded hover:bg-blue-600 transition-all duration-200 hidden md:block self-center"
        >
          Sign In
        </a> */}
        <button>
          <div className="w-10 h-10 bg-gray-500 text-white rounded-full flex items-center justify-center font-bold">
            IMG
          </div>
        </button>
      </nav>
    </header>
  );
};

export default Header;
