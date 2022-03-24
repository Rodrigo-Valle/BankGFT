import { Request, Response } from 'express';
import { usuarioLoginSchema } from '../schemas/usuario.login.schema';
import { LoginUserService } from '../service/LoginUserService';

export class LoginUserController {
    async handle(req: Request, res: Response) {

        try {
            await usuarioLoginSchema.validateAsync(req.body);

            const loginUserService = new LoginUserService();

            const usuario = await loginUserService.execute({
                email: req.body.email,
                senha: req.body.senha
            });

            const token = await usuario.generateAuthToken();

            res.status(201).send({ usuario, token });
        } catch (error) {
            res.status(400).send(error.message);
        }

    }
}