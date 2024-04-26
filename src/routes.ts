import { Router } from 'express';

import UserController from './app/controllers/UserController';
import PostController from './app/controllers/PostController';

const router = Router();

router.get('/user', UserController.index);
router.get('/user/:id', UserController.show);
router.post('/user', UserController.store);
router.delete('/user/:id', UserController.remove);
router.put('/user/:id', UserController.update);

router.post('/post', PostController.store);
router.get('/post', PostController.show);

export default router;
