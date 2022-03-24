import { ChangePasswordUserService } from "../service/ChangePasswordUserService";
import { Request, Response } from 'express';
import { usuarioChangePasswordSchema } from "../schemas/usuario.changePassword.schema";



export class ChangePasswordUserController {
    async handle(req: Request, res: Response) {

        try {
            await usuarioChangePasswordSchema.validateAsync(req.body);

            const changePasswordUserService = new ChangePasswordUserService();

            await changePasswordUserService.execute({
                email: req.body.email,
                senha: req.body.senha,
                codigo: req.body.codigo
            });

            res.status(200).send("senha alterada com sucesso");
        } catch (error) {
            res.status(400).send(error.message);
        }

    }
}