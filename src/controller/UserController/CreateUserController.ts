import { Request, Response } from 'express';
import { userCreateSchema } from '../../schemas/UserSchemas/user.create.schema';
import { CreateUserService } from '../../service/UserService/CreateUserService';

export class CreateUserController {
    async handle(req: Request, res: Response) {
        try {
            await userCreateSchema.validateAsync(req.body);

            const createUserService = new CreateUserService();

            const result = await createUserService.execute({
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha
            });

            result.senha = req.body.senha;

            res.status(201).send({result});
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}