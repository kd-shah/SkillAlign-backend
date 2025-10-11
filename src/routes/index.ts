import express from 'express';
import evaluationRoute from './evaluation.route';

const router = express.Router();

// Default App Routes
const defaultRoutes = [
  {
    path: '/evaluation',
    route: evaluationRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
