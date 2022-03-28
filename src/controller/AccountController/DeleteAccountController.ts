import { Request, Response } from 'express'
import { DeleteAccountService } from '../../service/AccountService/DeleteAccountService';

export class DeleteAccountController {
    async handle(req: Request, res: Response) {
        try {
            const deleteAccountService = new DeleteAccountService();

            const result = await deleteAccountService.execute(req.params.id);

            res.status(200).send(result);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}