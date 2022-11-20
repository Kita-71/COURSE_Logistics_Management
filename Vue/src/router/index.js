import Vue from 'vue'
import VueRouter from 'vue-router'
import UserHomeView from '../views/User/UserHomeView.vue'
import SignInUpView from "@/views/SignInUpView";
import UserOrderInfoView from "@/views/User/UserOrderInfoView";
import UserInfoView from "@/views/User/UserInfoView";
import UserChangeInfoView from "@/views/User/UserChangeInfoView";
import UserJoinView from "@/views/User/UserJoinView";
import UserBookView from "@/views/User/UserBookView";
import UserOrderView from "@/views/User/UserOrderView";
import ManagerHomeView from "@/views/Manager/ManagerHomeView";

Vue.use(VueRouter)

const routes = [
    {
    path: '/UserOrderInfo',
    name: 'UserOrderInfo' ,
    component: UserOrderInfoView,
    },
    {
        path: '/UserHome',
        name: 'UserHome' ,
        component: UserHomeView,
        meta: {requireAuth:true}
    },
    {
        path: '/UserInfo',
        name: 'UserInfo' ,
        component: UserInfoView,
        meta: {requireAuth:true}
    },
    {
        path: '/UserChangeInfo',
        name: 'UserChangeInfo' ,
        component: UserChangeInfoView,
        meta: {requireAuth:true}
    },
    {
        path: '/UserJoin',
        name: 'UserJoin' ,
        component: UserJoinView,
        meta: {requireAuth:true}
    },
    {
        path: '/Sign',
        name: 'Sign' ,
        component: SignInUpView,
    },
    {
        path: '/UserBook',
        name: 'UserBook' ,
        component: UserBookView,
        meta: {requireAuth:true}
    },
    {
        path: '/UserOrder',
        name: 'UserOrder' ,
        component: UserOrderView,
        meta: {requireAuth:true}
    },
    {
        path: '/ManagerHome',
        name: 'ManagerHome' ,
        component: ManagerHomeView
    }
]

const createRouter = () => new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
const router = createRouter();

export default router
