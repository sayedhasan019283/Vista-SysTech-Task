import express from 'express';
import { AuthRoutes } from '../app/modules/Auth/auth.route';
import { UserRoutes } from '../app/modules/user/user.route';
import path from 'path';
import { CatalogRoute } from '../app/modules/catalog/catalog.route';
import { cartRouter } from '../app/modules/cart/cart.route';
const router = express.Router();

const apiRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/catalog',
    route: CatalogRoute,
  },
  {
    path: '/cart',
    route: cartRouter,
  }
];   

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
