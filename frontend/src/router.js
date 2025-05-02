import { createRouter, createWebHistory } from 'vue-router';
import main from './components/main.vue';
import login from "./components/login.vue"; 
import Signup from "./components/signup.vue";
import dashboard from "./components/dashbord.vue";
import notfound from "./components/notfound.vue";

const routes = [
  { path: '/', redirect: '/main' }, 
  { path: '/main', component: main },
  { path: '/login', component: login },
  { path: '/signup', component: Signup },
  { path: '/dashboard/:username', component: dashboard },
  { path: '/:pathMatch(.*)*', component: notfound },
];

const router = createRouter({
  history: createWebHistory(), 
  routes
});

export default router;