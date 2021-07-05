import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { LoggedRoute } from './helpersRoutes';

import PublicPage from '../pages/PublicPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import BackofficePage from '../pages/BackofficePage'

export default function Routes() {
    return (
        <Router>
            <Switch>

                <Route exact path="/acceso" component={LoginPage} />
                <Route exact path="/registro" component={RegisterPage} />

                <LoggedRoute path="/backoffice" component={BackofficePage} />

                <Route path="/" component={PublicPage} />
                
                <Redirect path="/**" to="/" />

            </Switch>
        </Router>
    )
}