import { Router } from 'express';
import { auth } from '../middleware/auth';
import { ChangePasswordUserController } from '../controller/UserController/ChangePasswordUserController';
import { CreateUserController } from "../controller/UserController/CreateUserController";
import { GetUserController } from '../controller/UserController/GetUserController';
import { LoginUserController } from '../controller/UserController/LoginUserController';
import { RecoveryUserController } from '../controller/UserController/RecoveryUserController';
import { CreateAccountController } from '../controller/AccountController/CreateAccountController';
import { GetAccountController } from '../controller/AccountController/GetAccountController';
import { GetOneAccountController } from '../controller/AccountController/GetOneAccountController';
import { UpdateAccountController } from '../controller/AccountController/UpdateAccountController';
import { DeleteAccountController } from '../controller/AccountController/DeleteAccountController';

const router = Router();

router.post('/usuario', new CreateUserController().handle)
router.post('/usuario/auth', new LoginUserController().handle)
router.post('/usuario/recovery', new RecoveryUserController().handle)
router.post('/usuario/change-password', new ChangePasswordUserController().handle)
router.get('/usuario/me', auth, new GetUserController().handle)

router.post('/conta', auth, new CreateAccountController().handle)
router.get('/dados-conta', auth, new GetAccountController().handle)
router.get('/dados-conta/:id', auth, new GetOneAccountController().handle)
router.patch('/conta/:id', auth, new UpdateAccountController().handle)
router.delete('/conta/:id', auth, new DeleteAccountController().handle)

export { router }