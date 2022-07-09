import React from "react";

interface HeaderLinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}

const HeaderLink = ({ href, children, active }: HeaderLinkProps) => {
  return (
    <a
      href={href}
      className={
        active
          ? "font-poppins font-bold text-blue-400 border-b-[3px] border-b-blue-400 py-7 px-5 transition-all duration-200"
          : "font-poppins font-medium text-gray-500 hover:text-blue-400 border-b-[3px] border-transparent hover:border-b-blue-400 py-7 px-5 transition-all duration-200"
      }
    >
      {children}
    </a>
  );
};

export default HeaderLink;
