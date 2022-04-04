import { Request, Response, Next } from 'express';
import { accountUpdateSchema } from '../../schemas/AccountSchemas/account.update.schema';
import { UpdateAccountService } from '../../service/AccountService/UpdateAccountService';

export class UpdateAccountController {
    async handle(req: Request, res: Response, next: Next) {
        try {
            await accountUpdateSchema.validateAsync(req.body);

            const updateAccountService = new UpdateAccountService();

            const result = await updateAccountService.execute({
                saldo: req.body.saldo,
                cartaoCredito: req.body.cartaoCredito,
                status: req.body.status,
                id: req.params.id
            });

            res.result = result
            res.stat = 200
            next()
        } catch (error) {
            res.status(400)
            next(error)
        }
    }
}