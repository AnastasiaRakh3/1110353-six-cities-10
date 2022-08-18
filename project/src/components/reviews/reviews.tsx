import CommentForm from '../comment-form/comment-form';
import CommentsList from '../comments-list/comments-list';
import { CommentType } from '../../types/comment';
import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';

type ReviewsProps = {
  reviews: CommentType[],
  roomId: number,
};

export default function Reviews({ reviews, roomId }: ReviewsProps): JSX.Element {

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  const isCommentsFormAvailable = authorizationStatus === AuthorizationStatus.Auth;

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <CommentsList commentsList={reviews} />
      {isCommentsFormAvailable && <CommentForm roomId={roomId} />}
    </section>
  );
}
