import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VueLazyload from 'vue-lazyload';

// 解决触摸延迟问题
import FastClick from 'fastclick';
FastClick.attach(document.body);

Vue.use(VueRouter);
Vue.use(Vuex);

// 图片延迟加载
const loadingImg = require('./assets/images/lazyload/default.jpg');
const errorImg = require('./assets/images/nopic.png');
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: errorImg,
    loading: loadingImg,
    attempt: 1
});
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
