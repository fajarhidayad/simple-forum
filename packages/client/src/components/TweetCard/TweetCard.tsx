import { BiComment, BiShare } from "react-icons/bi";
import { BsHeart, BsBookmark } from "react-icons/bs";
import { Link } from "react-router-dom";
import CommentSection from "../CommentSection";
import ButtonAction from "./ButtonAction";
import CommentInput from "./CommentInput";

interface TweetCardProps {
  sender: string;
  createdAt: Date;
  text: string;
}

const TweetCard = ({ sender, createdAt, text }: TweetCardProps) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(createdAt).toString();

  return (
    <article className="bg-white rounded-lg py-4 px-5 shadow-sm mx-auto mb-7">
      <div className="flex">
        <div className="w-10 h-10 bg-gray-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
          IMG
        </div>
        <div>
          <Link
            to={`/coba`}
            className="font-poppins font-medium hover:underline"
          >
            {sender}
          </Link>
          <p className="font-noto text-xs text-gray-400">{date}</p>
        </div>
      </div>
      <p className="font-noto mt-4">{text}</p>
      <div className="flex justify-end space-x-3 text-xs text-gray-400 mt-4">
        <button>10 Comments</button>
        <button>1 Shared</button>
        <button>2 Saved</button>
      </div>

      <div className="border-y border-y-gray-300 flex justify-between px-2 xl:px-10 mt-2 py-1">
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

export default TweetCard;
