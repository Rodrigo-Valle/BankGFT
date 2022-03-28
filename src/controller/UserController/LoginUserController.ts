import { Request, Response } from 'express';
import { userLoginSchema } from '../../schemas/UserSchemas/user.login.schema';
import { LoginUserService } from '../../service/UserService/LoginUserService';

export class LoginUserController {
    async handle(req: Request, res: Response) {
        try {
            await userLoginSchema.validateAsync(req.body);

            const loginUserService = new LoginUserService();

            const result = await loginUserService.execute({
                email: req.body.email,
                senha: req.body.senha
            });

            const token = await result.generateAuthToken();

            res.status(201).send({ result, token });
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}