export const authReducer = (state, action) => {
    switch(action.type) {
        case 'LOAD_USER':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                loading: false
            }
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            localStorage.setItem('token', action.payload);
            return {
                ...state,
                ...action.payload, // token
                isAuthenticated: true,
                loading: false
            }
        case 'EMAIL_CHANGE_FAILURE':
            return {
                ...state,
                error: action.payload
            }
        case 'LOGIN_FAILURE':
        case 'REGISTER_FAILURE':
        case 'AUTH_ERROR':
        case 'LOGOUT':
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: null,
                error: action.payload,
                loading: false
            }
        case 'CLEAR_ERROR':
            return {
                ...state,
                error: null
            }
        default:
          return state;
    }
}