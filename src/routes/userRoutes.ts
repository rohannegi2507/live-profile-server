import express from 'express';
import {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
} from '../controllers/userControllers';

const router = express.Router();

router.route('/')
  .post(createUser)
  .get(getAllUsers);

router.route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

export default router;