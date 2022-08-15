export const StateAction = {
  City: {
    ChangeCity: 'city/changeCity',
  },
  Offer: {
    LoadOffers: 'offer/loadOffers',
    LoadStatus: 'offer/loadStatus',
    LoadOffer: 'offer/loadOffer',
    LoadNearbyOffers: 'offer/loadNearbyOffers',
  },
  Comment: {
    LoadComments: 'comment/loadComments',
    SendNewComment: 'comment/sendNewComment',
  },
  User: {
    RequireAuth: 'user/requireAuth',
    CheckAuth: 'user/checkAuth',
    SetUserName: 'user/setUtherName',
    Login: 'user/login',
    Logout: 'user/logout',
    RedirectToRoute: 'user/redirectToRoute',
  },
  Error: {
    SetServerError: 'error/setServerError',
  },
};
