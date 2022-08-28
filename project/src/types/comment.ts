type User = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
};

export type CommentType = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: User;
};

export type CommentData = {
  roomId: number;
  comment: string;
  rating: number;
};
