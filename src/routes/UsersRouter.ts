import express from 'express'
import { UserController } from '../controllers/UserController';
import { UserService } from '../services/UserService';
import { UserRepository } from '../repositories/UserRepository';

const router = express.Router();

const userService = new UserService(new UserRepository());
const useController = new UserController(userService);


router.get('/:id', useController.getUserById.bind(useController));

router.post('/', useController.saveUser.bind(useController));

router.delete('/:id', useController.deleteUser.bind(useController));

router.put('/login', useController.loginUser.bind(useController));
router.put('/logout', useController.logoutUser.bind(useController));
router.put('/cashout', useController.cashoutUser.bind(useController));

router.get('/history/:id', useController.getHistoryByUserId.bind(useController));



export default router
