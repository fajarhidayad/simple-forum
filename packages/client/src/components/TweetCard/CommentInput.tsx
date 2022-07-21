import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoSendSharp } from "react-icons/io5";
import { trpc } from "../../utils/trpc";

interface CommentInputProps {
  tweetId: number;
}

const CommentInput: React.FC<CommentInputProps> = ({ tweetId }) => {
  const [comment, setComment] = useState("");

  const utils = trpc.useContext();
  const commentMutation = trpc.useMutation(["comment.createComment"], {
    onSuccess() {
      utils.invalidateQueries(["comment.getCommentByTweet", tweetId]);
    },
  });

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment) return;

    commentMutation.mutateAsync({
      comment,
      tweetId,
    });
    setComment("");
  };

  return (
    <div className="mt-3 flex items-center">
      <div className="w-10 h-10 text-gray-700 rounded-full flex items-center justify-center font-bold mr-2">
        <FaUserCircle size={40} />
      </div>
      <form onSubmit={submitComment} className="flex w-full">
        <input
          type="text"
          placeholder="Comment this post"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="px-3 py-2 rounded border border-gray-300 bg-gray-100 flex-1 text-sm focus:outline-none"
        />
        <button
          disabled={comment.length < 1 || comment.length > 255}
          onClick={submitComment}
          className="bg-blue-500 active:bg-blue-600 text-white rounded ml-3 py-2 px-4 transition-all duration-200 disabled:bg-blue-300"
        >
          <IoSendSharp size={20} className="translate-x-[2px]" />
        </button>
      </form>
    </div>
  );
};

export default CommentInput;
