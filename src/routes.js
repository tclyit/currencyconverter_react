import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import Home from './components/home/home';
import About from './components/home/about';
import  { Left, Right, PageNotFound } from './components';

/*
* Create `routes` link for page
*/
const routes = (
    <Router history={hashHistory}>
        <Route path="/" component={Home} />
        <Route path="/" component={Left}>
        	<Route path="about" component={About} />
        </Route>
        <Route path="*" component={PageNotFound} />
    </Router>
);

export default routes;