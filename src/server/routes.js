import KoaRouter from 'koa-router';
import rootController from './controllers';
import apiRootController from './controllers/api';
import todosController from './controllers/api/todos';

const router = new KoaRouter();

router.get('/api/', apiRootController);
router.get('/api/todos/', todosController);
router.post('/api/todos/', todosController);
router.put('/api/todos/:id/', todosController);
router.delete('/api/todos/:id/', todosController);
router.get('/assets/*', (ctx) => {
  ctx.status = 404;
});
router.get('*', rootController);

export default router.routes();
