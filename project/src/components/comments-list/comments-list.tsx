import Comment from '../comment/comment';
import { CommentType } from '../../types/comment';

type CommentsListProps = {
  commentsList: CommentType[];
}

export default function CommentsList({ commentsList }: CommentsListProps) {

  return (
    <ul className="reviews__list">
      {commentsList.map(
        (comment) => <Comment key={comment.id} review={comment} />)}
    </ul>
  );
}
