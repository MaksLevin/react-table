import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./auth.action";

const initialState = {
    user: null,
    loading: false,
    error: null
};

export const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        return { ...state, loading: true, error: null };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        return { ...state, loading: false, user: action.payload };
        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
        return { ...state, loading: false, error: action.payload };
        case LOGOUT_SUCCESS:
        return { ...state, user: null };
        default:
        return state;
    }
};
