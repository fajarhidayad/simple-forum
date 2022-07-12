import React from "react";
import { Link, useLocation } from "react-router-dom";

interface HeaderLinkProps {
  href: string;
  children: React.ReactNode;
}

const HeaderLink = ({ href, children }: HeaderLinkProps) => {
  const { pathname } = useLocation();
  return (
    <Link
      to={href}
      className={
        pathname === href
          ? "font-poppins font-bold text-blue-400 border-b-[3px] border-b-blue-400 py-7 px-5 transition-all duration-200"
          : "font-poppins font-medium text-gray-500 hover:text-blue-400 border-b-[3px] border-transparent hover:border-b-blue-400 py-7 px-5 transition-all duration-200"
      }
    >
      {children}
    </Link>
  );
};

export default HeaderLink;
