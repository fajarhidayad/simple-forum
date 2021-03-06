import { useState } from "react";
import { BsCardImage } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { IoEarth } from "react-icons/io5";
import { trpc } from "../../utils/trpc";
import Loading from "../Loading";

const TweetBox = () => {
  const [content, setContent] = useState("");

  const { data } = trpc.useQuery(["user.getInfo"]);

  const utils = trpc.useContext();
  const { mutateAsync, isLoading } = trpc.useMutation("tweet.createTweet", {
    onSuccess(input) {
      utils.invalidateQueries(["tweet.getAll"]);
    },
  });

  const submitPost = () => {
    if (content && data) {
      mutateAsync(content);
      setContent("");
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg py-4 px-7 shadow-sm mx-auto w-full mb-5">
        <h4 className="font-poppins font-semibold text-slate-800 pb-2 border-b border-b-gray-300/70">
          Say anything
        </h4>
        <div className="mt-3 flex">
          <div className="w-10 h-10 text-gray-700 rounded-full flex items-center justify-center font-bold mr-2">
            <FaUserCircle size={40} />
          </div>
          <div className="flex-1">
            <textarea
              placeholder="Anything funny..."
              className="w-full p-2 focus:outline-none max-h-32"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="flex mt-2">
              {/* <button className="text-blue-500 mr-3">
              <BsCardImage size={20} />
            </button> */}
              <label
                htmlFor="file-upload"
                className="text-blue-500 mr-3 inline-block cursor-pointer"
              >
                <BsCardImage size={20} className="translate-y-[6px]" />
              </label>
              <input type="file" id="file-upload" className="hidden" />
              <button className="text-blue-500 flex space-x-1 items-center font-noto">
                <IoEarth size={20} />
                <span className="text-xs">Everyone can reply</span>
              </button>
              <button
                className="bg-blue-500 text-white px-5 py-2 rounded text-xs font-medium ml-auto font-noto hover:bg-blue-600 transition-colors duration-200 disabled:bg-blue-300"
                disabled={content === "" || isLoading}
                onClick={submitPost}
              >
                <Loading isLoading={isLoading} size={20}>
                  Tweet
                </Loading>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Loading
        isLoading={isLoading}
        size={45}
        className={`flex justify-center text-blue-500 ${isLoading && "mb-5"}`}
      />
    </>
  );
};

export default TweetBox;
