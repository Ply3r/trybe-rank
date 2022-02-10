import express from 'express';
import user from '../services/userService.js';
import userMiddleware from '../middlewares/userMiddleware.js';
const router = express.Router();

router
  .route('/sign-in')
  .get(user.signIn)

router
  .route('/sign-up')
  .post(user.insertOne);

router
  .route('/user')
  .get(userMiddleware.authenticateToken, user.getOne)
  .put(userMiddleware.authenticateToken, user.updateOne)

router
  .route('/user-progress')
  .put(userMiddleware.authenticateToken, user.updateProgress);


router
  .route('/users')
  .get(user.getAll);

export default router;