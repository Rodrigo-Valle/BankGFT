import { Request, Response, Next } from 'express';
import { userLoginSchema } from '../../schemas/UserSchemas/user.login.schema';
import { LoginUserService } from '../../service/UserService/LoginUserService';

export class LoginUserController {
    async handle(req: Request, res: Response, next: Next) {
        try {
            await userLoginSchema.validateAsync(req.body);

            const loginUserService = new LoginUserService();

            const result = await loginUserService.execute({
                username: req.body.username,
                senha: req.body.senha
            });

            const token = await result.generateAuthToken();

            res.result = { result, token };
            res.stat = 200;
            next();
        } catch (error) {
            res.status(400);
            next(error);
        }
    }
}