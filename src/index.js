import React from 'react';
import { render } from 'react-dom';
import routes from './routes';

require('./sass/app.scss');
require('./sass/globals.scss');

window.React = React;

render(routes, document.getElementById('reactContainer'));