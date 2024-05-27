import { Hono } from 'hono';

const superAdminRoute = new Hono();

superAdminRoute.get('/', (ctx) => {
  return ctx.json({ message: 'Bonjour Super Admin' });
});

export default superAdminRoute;
