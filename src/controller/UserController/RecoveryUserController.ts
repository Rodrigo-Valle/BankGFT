import { Request, Response } from 'express';
import { userRecoverySchema } from '../../schemas/UserSchemas/user.recovery.schema';
import { RecoveryUserService } from '../../service/UserService/RecoveryUserService';

export class RecoveryUserController {
    async handle(req: Request, res: Response) {
        try {
            await userRecoverySchema.validateAsync(req.body);

            const recoveryUserService = new RecoveryUserService();

            await recoveryUserService.execute(req.body.email);

            res.status(200).send("Solicitação enviada");
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}