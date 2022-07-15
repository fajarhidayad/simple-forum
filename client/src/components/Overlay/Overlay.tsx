import React, { useRef } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import { IoMdClose } from "react-icons/io";
import RecommendFollow from "../HomeSideBar/RecommendFollow";

interface OverlayProps {
  active: boolean;
  onCloseFn: () => void;
  title: string;
}

const Overlay = ({ active, onCloseFn, title }: OverlayProps) => {
  const menuRef = useRef(null);

  useClickOutside(menuRef, onCloseFn);

  if (active) {
    return (
      <section className="w-screen h-screen fixed top-0 bg-black/30 z-20 flex items-center justify-center">
        <div
          ref={menuRef}
          className="bg-white shadow rounded-lg w-[80%] md:w-[600px] h-2/3 p-5 overflow-y-scroll"
        >
          <div className="flex justify-between items-center pb-3 border-b-2 border-b-gray-200">
            <h5 className="font-poppins font-semibold text-xs">
              Jack Sparrow {title}
            </h5>
            <button onClick={onCloseFn}>
              <IoMdClose size={20} />
            </button>
          </div>

          <RecommendFollow name="Johnny" description="Hello" followers={120} />
          <RecommendFollow name="Johnny" description="Hello" followers={120} />
          <RecommendFollow name="Johnny" description="Hello" followers={120} />
          <RecommendFollow name="Johnny" description="Hello" followers={120} />
          <RecommendFollow name="Johnny" description="Hello" followers={120} />
          <RecommendFollow name="Johnny" description="Hello" followers={120} />
          <RecommendFollow name="Johnny" description="Hello" followers={120} />
          <RecommendFollow name="Johnny" description="Hello" followers={120} />
        </div>
      </section>
    );
  }

  return null;
};

export default Overlay;
