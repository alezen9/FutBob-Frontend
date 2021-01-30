import { ZenRoute, ZenRouteID, ZenSection } from "../types";

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
      _id: ZenRouteID.REGISTER,
      isPrivate: false,
      title: 'Register',
      path: '/auth/register'
   },
    // ============================ //
   {
      _id: ZenRouteID.CONFIRM_REGISTRATION,
      isPrivate: false,
      title: 'Confirm registration',
      path: '/auth/confirm-registration/:code'
   },
]