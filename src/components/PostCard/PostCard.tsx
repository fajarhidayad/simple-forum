import { BiComment, BiShare } from "react-icons/bi";
import { BsHeart, BsHeartFill, BsBookmark } from "react-icons/bs";
import { IoSendSharp } from "react-icons/io5";
import CommentSection from "../CommentSection";
import ButtonAction from "./ButtonAction";
import CommentInput from "./CommentInput";

const PostCard = () => {
  return (
    <article className="bg-white rounded-lg py-4 px-7 shadow-sm mx-auto my-5">
      <div className="flex">
        <div className="w-10 h-10 bg-gray-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
          IMG
        </div>
        <div>
          <h4 className="font-poppins font-medium">Jack Sparrow</h4>
          <p className="font-noto text-xs text-gray-400">24 August at 20:05</p>
        </div>
      </div>
      <p className="font-noto mt-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
        earum, ipsum, voluptates consectetur odit atque suscipit deserunt
        temporibus error magni veniam natus facere nisi sunt. Nesciunt autem
        iste quisquam a.
      </p>
      <div className="flex justify-end space-x-3 text-xs text-gray-400 mt-4">
        <button>10 Comments</button>
        <button>1 Shared</button>
        <button>2 Saved</button>
      </div>

      <div className="border-y border-y-gray-300 flex justify-between px-2 md:px-10 mt-2 py-1">
        <ButtonAction icon={<BiComment size={16} />} text="Comment" />
        <ButtonAction icon={<BiShare size={16} />} text="Share" />
        <ButtonAction icon={<BsHeart size={16} />} text="Like" />
        <ButtonAction icon={<BsBookmark size={16} />} text="Save" />
      </div>

      <CommentInput />

      <CommentSection />
    </article>
  );
};

export default PostCard;
