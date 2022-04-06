import { Request, Response, Next } from 'express';
import { userCreateSchema } from '../../schemas/UserSchemas/user.create.schema';
import { CreateUserService } from '../../service/UserService/CreateUserService';

export class CreateUserController {
    async handle(req: Request, res: Response, next: Next) {
        try {
            await userCreateSchema.validateAsync(req.body);

            const createUserService = new CreateUserService();

            const result = await createUserService.execute({
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha,
                descricao: req.body.descricao,
                celular: req.body.celular,
                username: req.body.username,
                dataNasc: req.body.dataNasc
            });

            result.senha = req.body.senha;

            res.result = result;
            res.stat = 201;
            next();
        } catch (error) {
            res.status(400);
            next(error);
        }
    }
}