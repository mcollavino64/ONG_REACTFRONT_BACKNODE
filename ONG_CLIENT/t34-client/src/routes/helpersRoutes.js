import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Alert from '../components/alertService/AlertService';
import { useSelector } from 'react-redux';
import { isAdmin } from '../features/login/loginSlice';
import { isLoggedIn } from './../features/login/loginSlice';


export const LoggedRoute = ({ component, ...options }) => {
    const _isLoggedIn = useSelector(isLoggedIn);
    if (_isLoggedIn)
        return <Route {...options} component={component} />;
    else {
        Alert.error('ACCESO DENEGADO', 'INICIAR SESIÓN para continuar.');
        return <Redirect to="/acceso" />
    }

}

export const BackofficeRoute = ({ component, ...options }) => {
    const _isLoggedIn = useSelector(isLoggedIn);
    const _isAdmin = useSelector(isAdmin);
    if (_isAdmin)
        return <Route {...options} component={component} />;
    else {
        Alert.error('ACCESO DENEGADO', 'Necesitas ser ADMINISTRADOR para continuar.');
        if(_isLoggedIn)
            return <Redirect to="/backoffice/perfil" />
        else
            return <Redirect to="/acceso" />
    }
}