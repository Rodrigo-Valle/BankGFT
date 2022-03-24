import { RecoveryUserService } from "../service/RecoveryUserService";
import { Request, Response } from 'express';
import { usuarioRecoverySchema } from "../schemas/usuario.recovery.schema";


export class RecoveryUserController {
    async handle(req: Request, res: Response) {

        try {
            await usuarioRecoverySchema.validateAsync(req.body);

            const recoveryUserService = new RecoveryUserService();

            await recoveryUserService.execute(req.body.email);

            res.status(200).send("Solicitação enviada");
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}