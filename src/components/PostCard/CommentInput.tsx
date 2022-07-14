import { IoSendSharp } from "react-icons/io5";

const CommentInput = () => {
  return (
    <div className="mt-3 flex items-center">
      <div className="w-10 h-10 bg-gray-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
        IMG
      </div>
      <input
        type="text"
        placeholder="Comment this post"
        className="px-3 py-2 rounded border border-gray-300 bg-gray-100 flex-1 text-sm focus:outline-none"
      />
      <button className="bg-blue-500 active:bg-blue-600 text-white rounded ml-3 py-2 px-4 transition-all duration-200">
        <IoSendSharp size={20} className="translate-x-[2px]" />
      </button>
    </div>
  );
};

export default CommentInput;
