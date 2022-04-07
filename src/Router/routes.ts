import { Router, Request, Response, Next, Error } from 'express';
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
import { CreateCoOwnerController } from '../controller/CoOwnerController/CreateCoOwnerController';
import { GetCoOwnerController } from '../controller/CoOwnerController/GetCoOwnerController';
import { GetOneCoOwnerController } from '../controller/CoOwnerController/GetOneCoOwnerController';

const router = Router();

router.post('/usuario', new CreateUserController().handle);
router.post('/usuario/auth', new LoginUserController().handle);
router.post('/usuario/recovery', new RecoveryUserController().handle);
router.post('/usuario/change-password', new ChangePasswordUserController().handle);
router.get('/usuario/me', auth, new GetUserController().handle);

router.post('/conta', auth, new CreateAccountController().handle);
router.get('/dados-conta', auth, new GetAccountController().handle);
router.get('/dados-conta/:id', auth, new GetOneAccountController().handle);
router.patch('/conta/:id', auth, new UpdateAccountController().handle);
router.delete('/conta/:id', auth, new DeleteAccountController().handle);

router.post('/co-titular', auth, new CreateCoOwnerController().handle);
router.get('/co-titular', auth, new GetCoOwnerController().handle);
router.get('/co-titular/:id', auth, new GetOneCoOwnerController().handle);

router.use('*', (req: Request, res: Response, next: Next) => {
    if (res.stat < 404 || res.stat !== undefined) {
        res.status(res.stat).json({
            hasError: false,
            error: null,
            data: res.result
        });

    } else {
        res.status(404).json('Not found');
    }
});

router.use((error: Error, req: Request, res: Response, next: Next) => {
    res.json({
        hasError: true,
        error: error.message,
        data: null
    });
});


export { router }

