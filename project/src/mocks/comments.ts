import { Comment } from '../types/comment';

export const commentsList: Comment[] = [
  {
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    date: 'Wed Jul 20 2022 11:50:11 GMT+0300 (Москва, стандартное время)',
    id: 2,
    rating: 5,
    user: {
      avatarUrl: 'img/avatar-max.jpg',
      id: 1,
      isPro: false,
      name: 'Oliver.conner'
    }
  },
  {
    comment: 'Never will come here again.',
    date: 'Wed Jul 20 2022 11:50:11 GMT+0300 (Москва, стандартное время)',
    id: 2,
    rating: 3.7,
    user: {
      avatarUrl: 'img/avatar-angelina.jpg',
      id: 2,
      isPro: false,
      name: 'James.Walker'
    }
  },
  {
    comment: 'Pretty nice!',
    date: 'Wed Jul 20 2022 11:50:11 GMT+0300 (Москва, стандартное время)',
    id: 1,
    rating: 1.2,
    user: {
      avatarUrl: 'img/avatar-max.jpg',
      id: 1,
      isPro: false,
      name: 'Oliver.conner'
    }
  }
];
