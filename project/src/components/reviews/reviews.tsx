import ReviewForm from '../review-form/review-form';
import CommentsList from '../comments-list/comments-list';
import { CommentType } from '../../types/comment';

type ReviewsProps = {
  reviews: CommentType[],
};

export default function Reviews({ reviews }: ReviewsProps): JSX.Element {
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <CommentsList commentsList={reviews} />
      <ReviewForm />
    </section>
  );
}
