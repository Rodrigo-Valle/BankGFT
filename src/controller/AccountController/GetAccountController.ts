import { Request, Response } from 'express';
import { GetAccountService } from '../../service/AccountService/GetAccountservice';

export class GetAccountController {
    async handle(req: Request, res: Response) {
        try {
            const getAccountService = new GetAccountService();

            const result = await getAccountService.execute(req.id);

            res.status(200).send(result);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}