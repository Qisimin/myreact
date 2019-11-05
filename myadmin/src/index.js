import React from 'react';
import ReactDOM from 'react-dom';
import App from './router'
// import App from './demo/less/index';
// import App from './demo/antd';
// import 'antd/dist/antd.css'
//全局引入样式
// import App from './App';
import axios from './utils/axios'
import {Provider} from 'react-redux'
import store from './store/store'
import * as serviceWorker from './serviceWorker';
React.Component.prototype.$axios=axios
ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
