import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import LinksPage from './pages/LinksPage';
import CreatePage from './pages/CreatePage';
import DetailPage from './pages/DetailPage';
import AuthPage from './pages/AuthPage';

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return <Switch>
            <Route exact path="/links" component={LinksPage}></Route>
            <Route exact path="/create" component={CreatePage}></Route>
            <Route path="/detail/:id" component={DetailPage}></Route>
            <Redirect to="/create"/>
        </Switch>
    }

    return <Switch>
        <Route exact path="/" component={AuthPage}></Route>
        <Redirect to="/"/>
    </Switch>
}