import { BiComment, BiShare } from "react-icons/bi";
import {
  BsHeart,
  BsBookmark,
  BsBookmarkFill,
  BsHeartFill,
} from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import CommentSection from "../CommentSection";
import ButtonAction from "./ButtonAction";
import CommentInput from "./CommentInput";
import dateformat from "dateformat";
import { trpc } from "../../utils/trpc";
import Loading from "../Loading";

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
  const utils = trpc.useContext();

  const { data } = trpc.useQuery(["comment.getCommentByTweet", id]);

  const { data: like } = trpc.useQuery(["like.countLike", { tweetId: id }]);
  const { data: savedTweet } = trpc.useQuery([
    "bookmark.countSaved",
    { tweetId: id },
  ]);
  const { mutateAsync, isLoading } = trpc.useMutation(["like.likeTweet"], {
    onSuccess() {
      utils.invalidateQueries(["like.countLike", { tweetId: id }]);
    },
  });

  const { mutateAsync: mutateSave, isLoading: loadingSave } = trpc.useMutation(
    ["bookmark.saveTweet"],
    {
      onSuccess() {
        utils.invalidateQueries(["bookmark.countSaved", { tweetId: id }]);
        utils.invalidateQueries(["bookmark.getSavedTweets"]);
      },
    }
  );

  const clickLike = () => {
    mutateAsync({ tweetId: id });
  };

  const saveTweet = () => {
    mutateSave({ tweetId: id });
  };

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

      <div className="border-b border-b-gray-300 flex justify-between px-2 xl:px-10 mt-4 py-1">
        <ButtonAction
          icon={<BiComment size={16} />}
          text={data ? `${data.count}` : "0"}
        />
        <ButtonAction icon={<BiShare size={16} />} text="0" />
        <ButtonAction
          icon={
            <Loading isLoading={isLoading} size={16} className="text-blue-500">
              {like && like.liked ? (
                <BsHeartFill className="text-red-400" size={16} />
              ) : (
                <BsHeart size={16} className="text-black" />
              )}
            </Loading>
          }
          text={like ? `${like.count}` : "0"}
          onClick={clickLike}
        />
        <ButtonAction
          icon={
            <Loading
              isLoading={loadingSave}
              size={16}
              className="text-blue-500"
            >
              {savedTweet && savedTweet.saved ? (
                <BsBookmarkFill className="text-yellow-400" size={16} />
              ) : (
                <BsBookmark size={16} className="text-black" />
              )}
            </Loading>
          }
          text={savedTweet ? savedTweet.count : 0}
          onClick={saveTweet}
        />
      </div>

      <CommentInput tweetId={id} />

      <CommentSection comments={data ? data.comments : []} />
    </article>
  );
};

export default TweetCard;
