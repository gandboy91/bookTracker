import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import {STORAGE_KEY} from "./constants/index";





const stateFromStorage = localStorage ? localStorage.getItem(STORAGE_KEY) : null;
console.log(JSON.parse(stateFromStorage));
ReactDOM.render(
    <App stateFromStorage={stateFromStorage ? JSON.parse(stateFromStorage) : {}}/>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.1
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
