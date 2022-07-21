import { trpc } from "../../utils/trpc";
import CommentCard from "./CommentCard";

interface Comment {
  id: number;
  createdAt: Date;
  text: string;
  user: {
    firstName: string;
    lastName: string;
  };
}

interface CommentSectionProps {
  comments: Comment[] | undefined;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments }) => {
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
