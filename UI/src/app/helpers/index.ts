import {CommonRoute} from "../interfaces/app-route-path-name";
import {APP_ROUTES} from "../shared/constanst";

const isNullOrUndefined = (value: null | undefined | string) => {
    return value === null || value === undefined;
}

const generateRouteFromSegments = (...segments: string[]) => {
    return segments.reduce((acc, currentValue) => {
        return acc.concat(currentValue)
    }, '')
}

const commonRoutes: { [key in CommonRoute]: string } = {
    authLogin: generateRouteFromSegments(APP_ROUTES.auth, '/', APP_ROUTES.login),
    authLogout: generateRouteFromSegments(APP_ROUTES.auth, '/', APP_ROUTES.logout),
    authSignup: generateRouteFromSegments(APP_ROUTES.auth, '/', APP_ROUTES.signup),
}
export const Helpers = {
    isNullOrUndefined,
    generateRouteFromSegments,
    commonRoutes
}
