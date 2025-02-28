import { MENU_ITEMS } from './src/app/data/menu.model';

const menuItemRoutes = MENU_ITEMS.map(item => `/menu-item/${item.id}`);

export default {
  routes: [
    '/',
    '/reviews',
    '/catering',
    '/menu',
    '/contact-us',
    '/meet-us',
    ...menuItemRoutes
  ],
  renderingStrategy: 'all'
};
