import { BiComment, BiShare } from "react-icons/bi";
import { BsHeart, BsBookmark } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import CommentSection from "../CommentSection";
import ButtonAction from "./ButtonAction";
import CommentInput from "./CommentInput";
import dateformat from "dateformat";
import { trpc } from "../../utils/trpc";

interface TweetCardProps {
  id: number;
  fullName: string;
  username: string;
  createdAt: Date;
  text: string;
}

const TweetCard = ({
  fullName,
  createdAt,
  text,
  username,
  id,
}: TweetCardProps) => {
  const { data: comments } = trpc.useQuery(["comment.getCommentByTweet", id]);

  const date = dateformat(createdAt, "dd mmmm 'at' HH:MM");

  return (
    <article className="bg-white rounded-lg py-4 px-5 shadow-sm mx-auto mb-5">
      <div className="flex">
        <div className="w-10 h-10 text-gray-700 rounded-full flex items-center justify-center font-bold mr-2">
          <FaUserCircle size={40} />
        </div>
        <div>
          <Link
            to={`/${username}`}
            className="font-poppins font-medium hover:underline"
          >
            {fullName}
          </Link>
          <p className="font-noto text-xs text-gray-400">{date}</p>
        </div>
      </div>
      <p className="font-noto mt-4">{text}</p>
      <div className="flex justify-end space-x-3 text-xs text-gray-400 mt-4">
        <button>
          {comments && comments.length > 0 ? comments.length + " Comments" : ""}
        </button>
        <button>1 Shared</button>
        <button>2 Saved</button>
      </div>

      <div className="border-y border-y-gray-300 flex justify-between px-2 xl:px-10 mt-2 py-1">
        <ButtonAction icon={<BiComment size={16} />} text="Comment" />
        <ButtonAction icon={<BiShare size={16} />} text="Share" />
        <ButtonAction icon={<BsHeart size={16} />} text="Like" />
        <ButtonAction icon={<BsBookmark size={16} />} text="Save" />
      </div>

      <CommentInput tweetId={id} />

      <CommentSection comments={comments} />
    </article>
  );
};

export default TweetCard;
