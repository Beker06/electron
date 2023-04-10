import { USUARIO_AUTENTICADO, USUARIO_ELIMINADO } from "../actions/authActions";

const initialState = {
    isAuthenticated: false,
    user: {}
};

export const AuthUser = (state = initialState, action) => {
    switch (action.type) {
        case USUARIO_AUTENTICADO:
            return {
                isAuthenticated: true,
                user: action.payload,
            };
        case USUARIO_ELIMINADO:
            return {
                isAuthenticated: false,
                user: {},
            };
        default:
            return state;
    }
};
