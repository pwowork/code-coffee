import {createApp} from "vue";
import App from "./App.vue";
import {createRouter, createWebHashHistory, RouteRecordRaw, routerKey} from 'vue-router';
// define routes
const routes: Array<RouteRecordRaw>=[
    {
        path:'/',
        name: 'home',
        component: ()=> import ('./dog-list.vue')  // lazy loading
    },
    {
        path:'/dog/:name',
        name: 'details',
        component: ()=> import ('./dog-details.vue'),  // lazy loading
        props: true
    }
];

// create router
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

//update the app using router
createApp(App).use(router). mount('#app');
// router.get('/', (req, res)={});