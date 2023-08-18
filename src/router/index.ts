import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../pages/HomeView.vue';
import LoginView from '../pages/Login.vue';
// import { createAuth0, authGuard } from "@auth0/auth0-vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'beforeHome',
      component: HomeView
    },
    {
      path: '/home',
      name: 'home',
      component: LoginView
    }
  ]
});

export default router;
