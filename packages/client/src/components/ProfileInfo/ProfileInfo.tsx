import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdPersonAdd } from "react-icons/md";

interface ProfileInfoProps {
  showOverlayFn: (type: string) => void;
  name?: string;
  description?: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  showOverlayFn,
  name,
  description,
}) => {
  return (
    <div className="bg-white rounded-lg min-h-[163px] shadow p-6 col-span-3">
      <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-3 md:items-start space-y-3 md:space-y-0">
        <div className="w-[120px] h-[120px] text-gray-500 rounded-full flex items-center justify-center font-bold">
          <FaUserCircle size={110} />
        </div>
        <div className="md:mr-auto flex flex-col">
          <div className="flex flex-col md:flex-row md:space-x-6 items-center">
            <h3 className="text-2xl font-poppins font-semibold">
              {name ? name : "User Not Found"}
            </h3>
            <div className="flex justify-between space-x-6 mt-3 md:mt-0">
              <button
                onClick={() => showOverlayFn("Following")}
                className="text-sm font-poppins font-medium text-gray-600 flex space-x-1 items-baseline hover:underline"
              >
                <span className="font-semibold">102</span>{" "}
                <p className="text-gray-400">Following</p>
              </button>
              <button
                onClick={() => showOverlayFn("Followers")}
                className="text-sm font-poppins font-medium text-gray-600 flex space-x-1 items-baseline hover:underline"
              >
                <span className="font-semibold">15,2k</span>{" "}
                <p className="text-gray-400">Followers</p>
              </button>
            </div>
          </div>
          <p className="text-lg font-noto mt-3 text-gray-500 max-w-[500px]">
            {description ? (
              description
            ) : (
              <span className="italic text-base">No description</span>
            )}
          </p>
        </div>
        {name && (
          <button className="bg-blue-500 text-white px-6 py-2 font-noto text-xs flex items-center rounded active:bg-blue-600">
            <MdPersonAdd className="mr-1 text-base" />
            Follow
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
