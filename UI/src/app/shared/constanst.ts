import {AppRoutePathName} from "../interfaces/app-route-path-name";

export const APP_ROUTES: {[key in AppRoutePathName]: string} = {
  index: '/',
  login: 'login',
  signup: 'signup',
  error: 'error',
  logout: 'logout',
  auth: 'auth'
}
