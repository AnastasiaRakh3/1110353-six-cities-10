import { useState, ChangeEvent, Fragment, FormEvent } from 'react';

import { Setting } from '../../const';
import { useAppDispatch } from '../../hooks';
import { sendNewPost } from '../../store/api-actions';

const MAX_COMMENT_LENGTH = 50;

type ratingTitleType = {
  [key: number]: string;
}

type ReviewFormProps = {
  roomId: number;
};

const ratingTitle: ratingTitleType = {
  1: 'terribly',
  2: 'badly',
  3: 'not bad',
  4: 'good',
  5: 'perfect',
};

export default function ReviewForm({ roomId }: ReviewFormProps): JSX.Element {

  const dispatch = useAppDispatch();

  const [review, setReview] = useState({ rating: 0, comment: '' });

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>): void => setReview({ ...review, rating: Number(evt.target.value) });

  const handleTextChange = (evt: ChangeEvent<HTMLTextAreaElement>): void => setReview({ ...review, comment: evt.target.value });

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    dispatch(sendNewPost({ roomId, comment: review.comment, rating: review.rating }));
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleFormSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {
          [...new Array(Setting.MAX_RATING)].map((_, index) => {
            const starNumber = Setting.MAX_RATING - index;
            return (
              <Fragment key={starNumber}>
                <input
                  className="form__rating-input visually-hidden"
                  name="rating"
                  value={starNumber}
                  id={`${starNumber}-stars`}
                  type="radio"
                  onChange={handleRatingChange}
                />
                <label
                  htmlFor={`${starNumber}-stars`}
                  className="reviews__rating-label form__rating-label"
                  title={ratingTitle[starNumber]}
                >
                  <svg className="form__star-image" width="37" height="33">
                    <use xlinkHref="#icon-star"></use>
                  </svg>
                </label>
              </Fragment>
            );
          })
        }
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review.comment}
        maxLength={MAX_COMMENT_LENGTH}
        onChange={handleTextChange}
      >
      </textarea>

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">{MAX_COMMENT_LENGTH} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled
        >
          Submit
        </button>
      </div>
    </form>
  );
}
