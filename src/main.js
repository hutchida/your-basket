import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store/index.js';
import App from './App.vue';
import Cart from './components/Cart.vue';

Vue.use(VueRouter);

// Define routes
const routes = [{ path: '/', component: Cart }];

// Register routes
const router = new VueRouter({
    mode: 'history',
    routes,
});

new Vue({
    el: '#app',
    render: (h) => h(App),
    router,
    store,
});
