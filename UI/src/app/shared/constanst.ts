import {AppRoutePathName} from "../interfaces/app-route-path-name";

export const APP_ROUTES: {[key in AppRoutePathName]: string} = {
  index: '/',
  login: 'auth/login',
  signup: 'auth/signup',
  error: 'error'
}
