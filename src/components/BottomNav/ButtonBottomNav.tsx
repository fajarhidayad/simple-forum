import { Link, useLocation } from "react-router-dom";

interface ButtonBottomNavProps {
  href: string;
  children: React.ReactNode;
}

const ButtonBottomNav = ({ href, children }: ButtonBottomNavProps) => {
  const { pathname } = useLocation();
  const active =
    pathname === href ? "border-b-blue-500" : "border-b-transparent";
  return (
    <div className={`w-1/2 pb-3 border-b-4 ${active}`}>
      <button className="py-3 w-full rounded-md active:bg-gray-200 transition-all duration-200">
        <Link to={href}>{children}</Link>
      </button>
    </div>
  );
};

export default ButtonBottomNav;
