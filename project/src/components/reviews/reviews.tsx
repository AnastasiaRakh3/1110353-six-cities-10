import { memo } from 'react';

import CommentForm from '../comment-form/comment-form';
import CommentsList from '../comments-list/comments-list';
import { AuthorizationStatus } from '../../const';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getComments } from '../../store/data-process/selectors';
import { prepareComments } from '../../utils';
import { useAppSelector } from '../../hooks';

type ReviewsProps = {
  roomId: number,
};

function Reviews({ roomId }: ReviewsProps): JSX.Element {

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const comments = useAppSelector(getComments);

  const isCommentsFormAvailable = authorizationStatus === AuthorizationStatus.Auth;

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot;
        <span className="reviews__amount">
          {prepareComments(comments).length}
        </span>
      </h2>
      <CommentsList commentsList={prepareComments(comments)} />
      {isCommentsFormAvailable && <CommentForm roomId={roomId} />}
    </section>
  );
}

export default memo(Reviews);
