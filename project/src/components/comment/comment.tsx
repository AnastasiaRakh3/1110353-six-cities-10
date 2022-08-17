import { CommentType } from '../../types/comment';
import { setRatingStarWidth, humanizeCommentDate } from '../../utils';

type CommentProps = {
  review: CommentType;
}

export default function Comment({ review }: CommentProps): JSX.Element {

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={review.user.avatarUrl}
            width="54"
            height="54"
            alt={`Reviews avatar ${review.user.name}`}
          />
        </div>
        <span className="reviews__user-name">
          {review.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: setRatingStarWidth(review) }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.comment}
        </p>
        <time
          className="reviews__time"
          dateTime={review.date}
        >
          {humanizeCommentDate(review.date)}
        </time>
      </div>
    </li>
  );

}
