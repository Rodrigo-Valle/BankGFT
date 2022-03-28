import { Request, Response } from 'express';
import { GetOneAccountService } from '../../service/AccountService/GetOneAccountService';

export class GetOneAccountController {
    async handle(req: Request, res: Response) {
        try {
            const getOneAccountService = new GetOneAccountService();

            const result = await getOneAccountService.execute(req.id, req.params.id);

            res.status(200).send(result);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}