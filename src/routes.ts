import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home';

export const routes = [
  {
    path: '/',
    component: Dashboard,
  },
  {
    path: '/home',
    component: Home,
    authenticatedRoute: true,
  },
];
