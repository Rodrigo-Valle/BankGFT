import { Router } from 'express';
import { ChangePasswordUserController } from '../controller/ChangePasswordUserController';

import { CreateUserController } from "../controller/CreateUserController";
import { GetUserController } from '../controller/GetUserController';
import { LoginUserController } from '../controller/LoginUserController';
import { RecoveryUserController } from '../controller/RecoveryUserController';
import { auth } from '../middleware/auth';

const router = Router();

router.post('/usuario', new CreateUserController().handle)
router.post('/usuario/auth', new LoginUserController().handle)
router.post('/usuario/recovery', new RecoveryUserController().handle)
router.post('/usuario/change-password', new ChangePasswordUserController().handle)
router.get('/usuario/me',auth, new GetUserController().handle)


export { router }