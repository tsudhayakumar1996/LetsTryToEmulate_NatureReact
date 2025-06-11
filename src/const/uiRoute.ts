export const HOME_UI_ROUTE = '/'
export const AUTH_UI_ROUTE = 'auth'
export const MAP = 'map'
export const SUGGEST_PLACE_ROUTE = '/map/suggestLocation'
export const CARING_ROUTE = '/map/care'
export const PLANTING_ROUTE = '/doPlant'
export const SUPPORT_ROUTE = '/support'
export const LOGIN_UI_ROUTE = '/' + AUTH_UI_ROUTE + '/' + 'login'

export const AUTH_UI_ROUTES = [LOGIN_UI_ROUTE]
export const PROTECTED_ROUTES = [CARING_ROUTE, PLANTING_ROUTE, SUPPORT_ROUTE, SUGGEST_PLACE_ROUTE]
