import React from 'react';
import ReactDOM from 'react-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';

import store from './store';
import * as serviceWorker from './serviceWorker';
import UserProvider from './components/user/user.context';
import enviromentalVariable from 'dotenv';

//env fn
enviromentalVariable.config();

// configure toastify
toast.configure({
    position: "bottom-center",
    autoClose: 12000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    draggable: false,
    pauseOnHover: true
});

ReactDOM.render(
    <Provider store={store}>
        <UserProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </UserProvider>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
