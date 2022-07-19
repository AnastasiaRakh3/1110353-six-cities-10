import { useState, ChangeEvent, Fragment } from 'react';
import { Setting } from '../../const';

type ratingTitleType = {
  [key: number]: string;
}

export default function ReviewForm(): JSX.Element {
  const [review, setReview] = useState({ rating: 0, comment: '' });
  const ratingTitle: ratingTitleType = {
    1: 'terribly',
    2: 'badly',
    3: 'not bad',
    4: 'good',
    5: 'perfect',
  };

  return (
    <form className="reviews__form form" action="#" method="post">
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
                  onClick={() => setReview({ ...review, rating: starNumber })}
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
        onChange={(evt: ChangeEvent<HTMLTextAreaElement>) => setReview({ ...review, comment: evt.target.value })}
      >
      </textarea>

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
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
