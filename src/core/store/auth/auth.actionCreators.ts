import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./auth.action";

export const loginRequest = (email: string, password: string) => ({
    type: LOGIN_REQUEST,
    payload: { email, password }
  });

  export const loginSuccess = (user: any) => ({
    type: LOGIN_SUCCESS,
    payload: user
  });

  export const loginFailure = (error: string) => ({
    type: LOGIN_FAILURE,
    payload: error
  });

  export const logoutRequest = () => ({ type: LOGOUT_REQUEST });

  export const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });
  
  export const logoutFailure = (error: string) => ({
    type: LOGOUT_FAILURE,
    payload: error
  });

  export const registerRequest = (email: string, password: string) => ({
    type: REGISTER_REQUEST,
    payload: { email, password }
  });

  export const registerSuccess = (user: any) => ({
    type: REGISTER_SUCCESS,
    payload: user
  });

  export const registerFailure = (error: string) => ({
    type: REGISTER_FAILURE,
    payload: error
  });
