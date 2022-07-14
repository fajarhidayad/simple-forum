import { FaCog, FaUserCircle } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";

interface PopOverMenuProps {
  active: boolean;
}

const PopOverMenu = ({ active }: PopOverMenuProps) => {
  const showMenu = active ? "absolute" : "hidden";

  return (
    <div
      className={`bg-white shadow rounded-lg p-4 -bottom-7 md:-bottom-2 right-3 translate-y-full w-full transition-all duration-200 ${showMenu}`}
    >
      <Link
        to="/profile"
        className="text-xs font-noto text-gray-600 font-medium flex items-center hover:bg-gray-200 p-3 rounded-lg transition-all duration-150 mb-1"
      >
        <FaUserCircle size={16} className="mr-3" />
        My Profile
      </Link>
      <Link
        to="/settings"
        className="text-xs font-noto text-gray-600 font-medium flex items-center hover:bg-gray-200 p-3 rounded-lg transition-all duration-150 mb-1"
      >
        <FaCog size={16} className="mr-3" />
        Settings
      </Link>
      <hr className="border-gray-300" />
      <Link
        to="/settings"
        className="text-xs font-noto text-red-500 font-medium flex items-center hover:bg-gray-200 p-3 rounded-lg transition-all duration-150 mt-1"
      >
        <IoIosLogOut size={16} className="mr-3" />
        Logout
      </Link>
    </div>
  );
};

export default PopOverMenu;
