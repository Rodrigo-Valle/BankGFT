import { Request, Response, Next } from 'express'
import { DeleteAccountService } from '../../service/AccountService/DeleteAccountService';

export class DeleteAccountController {
    async handle(req: Request, res: Response, next: Next) {
        try {
            const deleteAccountService = new DeleteAccountService();

            const result = await deleteAccountService.execute(req.params.id);

            res.result = result
            res.stat = 200
            next()
        } catch (error) {
            res.status(400)
            next(error)
        }
    }
}