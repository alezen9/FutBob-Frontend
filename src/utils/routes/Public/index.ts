import { ZenRoute, ZenRouteID } from "../types";

export const publicRoutes: ZenRoute[] = [
   // ============================ //
   {
      _id: ZenRouteID.ERROR,
      isPrivate: false,
      title: 'Error',
      path: '/error'
   },
   // ============================ //
   {
      _id: ZenRouteID.LOGIN,
      isPrivate: false,
      title: 'Login',
      path: '/auth/login'
   },
   // ============================ //
   {
      _id: ZenRouteID.REQUEST_ACCOUNT,
      isPrivate: false,
      title: 'Request account',
      path: '/auth/account/request'
   },
   {
      _id: ZenRouteID.FINALIZE_ACCOUNT,
      isPrivate: false,
      title: 'Finalize account registration',
      path: '/auth/account/finalize/:code'
   },
   // ============================ //
   {
      _id: ZenRouteID.REQUEST_RESET_PASSWORD,
      isPrivate: false,
      title: 'Request account',
      path: '/auth/password/forgot'
   },
   {
      _id: ZenRouteID.FINALIZE_RESET_PASSWORD,
      isPrivate: false,
      title: 'Finalize reset password',
      path: '/auth/password/reset/:code'
   }
]