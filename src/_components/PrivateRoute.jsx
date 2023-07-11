import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { authenticationService } from '@/_services';

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = authenticationService.currentUserValue;
        if (!currentUser) {
            // если пользователь не вошел в систему, его перенаправляет на авторизацию
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        // проверка роли
        if (roles && roles.indexOf(currentUser.role) === -1) {
            // если роль не авторизована, то перенаправляет на домашнюю стр
            return <Redirect to={{ pathname: '/'}} />
        }

        // при авторизации возвращает компонент
        return <Component {...props} />
    }} />
)