import { FaCompass, FaHome, FaBookmark } from "react-icons/fa";
import ButtonBottomNav from "./ButtonBottomNav";

const BottomNav = () => {
  return (
    <footer className="md:hidden">
      <div className="fixed w-full bottom-0 grid grid-cols-3 gap-1 pt-3 bg-white justify-items-center border-t text-gray-500">
        <ButtonBottomNav href="/">
          <FaHome size={18} className="mx-auto" />
        </ButtonBottomNav>
        <ButtonBottomNav href="/explore">
          <FaCompass size={18} className="mx-auto" />
        </ButtonBottomNav>
        <ButtonBottomNav href="/bookmark">
          <FaBookmark size={18} className="mx-auto" />
        </ButtonBottomNav>
        {/* <button className="py-3 w-3/4 rounded-md hover:bg-gray-200 transition-all duration-200">
        </button>
        <button className="py-3 w-3/4 rounded-md hover:bg-gray-200 transition-all duration-200">
        </button> */}
      </div>
    </footer>
  );
};

export default BottomNav;
