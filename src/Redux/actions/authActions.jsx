export const USUARIO_AUTENTICADO = "USUARIO_AUTENTICADO";
export const USUARIO_ELIMINADO = "USUARIO_ELIMINADO";

export const usuarioAuthAction = (usuario) => {
    return {
        type: USUARIO_AUTENTICADO,
        payload: usuario,
    };
};

//user logout
export const usuarioEliminadoAction = () => {
    return {
        type: USUARIO_ELIMINADO,
    };
};

export const AutenticarUsuario = (user) => {
    return (dispatch) => {
        dispatch(usuarioAuthAction(user));
    };
};

export const CerrarSesion = () => {
    return (dispatch) => {
        dispatch(usuarioEliminadoAction());
    };
};
