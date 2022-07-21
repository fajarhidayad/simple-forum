import { trpc } from "../../utils/trpc";
import CommentCard from "./CommentCard";

interface CommentSectionProps {
  postId: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const { data: comments } = trpc.useQuery([
    "comment.getCommentByTweet",
    postId,
  ]);

  return (
    <div className="mt-3 border-t border-t-gray-300">
      {comments &&
        comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment.text}
            createdAt={comment.createdAt}
            fullName={`${comment.user.firstName} ${comment.user.lastName}`}
          />
        ))}
    </div>
  );
};

export default CommentSection;
