import { ZenRoute, ZenRouteID, ZenSection } from "../types";

export const publicRoutes: ZenRoute[] = [
   // ============================ //
   {
      _id: ZenRouteID.LOGIN,
      isPrivate: false,
      title: 'Login',
      path: '/login'
   },
    // ============================ //
   {
      _id: ZenRouteID.REGISTER,
      isPrivate: false,
      title: 'Register',
      path: '/register'
   },
    // ============================ //
   {
      _id: ZenRouteID.CONFIRM_REGISTRATION,
      isPrivate: false,
      title: 'Confirm registration',
      path: '/confirm-registration/:code'
   },
]