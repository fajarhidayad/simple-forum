import { FaCompass, FaHome, FaBookmark } from "react-icons/fa";

const BottomNav = () => {
  return (
    <footer className="md:hidden">
      <div className="fixed w-full bottom-0 grid grid-cols-3 gap-1 pt-3 bg-white justify-items-center border-t text-gray-500">
        <div className="w-1/2 pb-3 border-b-4 border-b-blue-500">
          <button className="py-3 w-full rounded-md hover:bg-gray-200 transition-all duration-200">
            <FaHome size={18} className="mx-auto" />
          </button>
        </div>
        <div className="w-1/2 pb-3 border-b-4 border-b-transparent">
          <button className="py-3 w-full rounded-md hover:bg-gray-200 transition-all duration-200">
            <FaCompass size={18} className="mx-auto" />
          </button>
        </div>
        <div className="w-1/2 pb-3 border-b-4 border-b-transparent">
          <button className="py-3 w-full rounded-md hover:bg-gray-200 transition-all duration-200">
            <FaBookmark size={18} className="mx-auto" />
          </button>
        </div>
        {/* <button className="py-3 w-3/4 rounded-md hover:bg-gray-200 transition-all duration-200">
        </button>
        <button className="py-3 w-3/4 rounded-md hover:bg-gray-200 transition-all duration-200">
        </button> */}
      </div>
    </footer>
  );
};

export default BottomNav;
