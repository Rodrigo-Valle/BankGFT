import { Request, Response, Next } from 'express';
import { userRecoverySchema } from '../../schemas/UserSchemas/user.recovery.schema';
import { RecoveryUserService } from '../../service/UserService/RecoveryUserService';

export class RecoveryUserController {
    async handle(req: Request, res: Response, next: Next) {
        try {
            await userRecoverySchema.validateAsync(req.body);

            const recoveryUserService = new RecoveryUserService();

            await recoveryUserService.execute(req.body.email);

            res.result = 'Solicitação enviada';
            res.stat = 200;
            next();
        } catch (error) {
            res.status(400);
            next(error);
        }
    }
}