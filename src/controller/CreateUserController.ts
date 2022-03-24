import { Request, Response } from 'express';
import { CreateUserService } from '../service/CreateUserService';
import { usuarioSchema } from '../schemas/usuario.schema';
import * as joi from "joi";



export class CreateUserController {
    async handle(req: Request, res: Response) {
        try {
            await usuarioSchema.validateAsync(req.body);

            const createUserService = new CreateUserService();

            const usuario = await createUserService.execute({
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha
            });

            usuario.senha = req.body.senha;

            res.status(201).send(usuario);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}