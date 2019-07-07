import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'react-app-polyfill/ie11';
import 'core-js';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware  } from 'redux-starter-kit';
import logger from 'redux-logger';
import reducer from './store/reducers/index';
import cssVars from 'css-vars-ponyfill';

import './index.css';
import App from './containers/App/App';

cssVars({});

const enableReduxLogger = false;
const middleware = [...getDefaultMiddleware(), ...(enableReduxLogger ? [logger] : [])];

const store = configureStore({
    reducer,
    middleware,
    devTools: process.env.NODE_ENV !== 'production',
});

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
