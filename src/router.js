import { createRouter, createWebHistory } from 'vue-router';
import SignIn from '@/components/auth/SignIn.vue';
import SignUp from '@/components/auth/SignUp.vue';
import Dashboard from '@/components/pages/Dashboard.vue';
import Profile from '@/components/auth/Profile.vue';

import Navbar from '@/components/includes/Navbar.vue';
import Sidebar from '@/components/includes/Sidebar.vue';
import Footer from '@/components/includes/Footer.vue';
import ControlSidebar from '@/components/includes/ControlSidebar.vue';

const routes = [
    {
        path: '/',
        name: 'SignIn',
        component: SignIn
    },
    {
        path: '/signin',
        name: 'signIn',
        component: SignIn
    },
    {

        path: '/signup',
        name: 'signUp',
        component: SignUp
    },
    {

        path: '/dashboard',
        name: 'dashboard',
        components: {
            navbar: Navbar,
            sidebar: Sidebar,
            footer: Footer,
            control_sidebar: ControlSidebar,
            default: Dashboard
        }
    },
    {

        path: '/profile',
        name: 'profile',
        components: {
            navbar: Navbar,
            sidebar: Sidebar,
            footer: Footer,
            control_sidebar: ControlSidebar,
            default: Profile
        }
    },
    {
        path: '/:path(.*)*',
        redirect: { name: 'SignIn' }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router;