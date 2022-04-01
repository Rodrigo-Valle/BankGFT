import { Request, Response } from 'express';
import { GetAccountService } from '../../service/AccountService/GetAccountservice';

export class GetAccountController {
    async handle(req: Request, res: Response) {
        try {
            const getAccountService = new GetAccountService();

            const usuario = req.id

            const result = await getAccountService.execute(usuario);

            res.status(200).send(result);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}