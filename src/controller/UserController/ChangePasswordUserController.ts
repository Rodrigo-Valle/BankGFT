import { ChangePasswordUserService } from "../../service/UserService/ChangePasswordUserService";
import { Request, Response, Next } from 'express';
import { userChangePasswordSchema } from "../../schemas/UserSchemas/user.changePassword.schema";

export class ChangePasswordUserController {
    async handle(req: Request, res: Response, next: Next) {
        try {
            await userChangePasswordSchema.validateAsync(req.body);

            const changePasswordUserService = new ChangePasswordUserService();

            await changePasswordUserService.execute({
                email: req.body.email,
                senha: req.body.senha,
                codigo: req.body.codigo
            });

            res.result = "Senha alterada com sucesso";
            res.stat = 200;
            next();
        } catch (error) {
            res.status(400);
            next(error);
        }
    }
}