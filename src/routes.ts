import { Router } from 'express';

import UserController from './app/controllers/UserController';

const router = Router();

router.get('/user', UserController.index);
router.get('/user/:id', UserController.show);
router.post('/user', UserController.store);
router.delete('/user/:id', UserController.remove);
router.put('/user/:id', UserController.update);

export default router;
