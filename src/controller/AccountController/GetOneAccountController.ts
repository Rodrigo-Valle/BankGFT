import { Request, Response, Next } from 'express';
import { GetOneAccountService } from '../../service/AccountService/GetOneAccountService';

export class GetOneAccountController {
    async handle(req: Request, res: Response, next: Next) {
        try {
            const getOneAccountService = new GetOneAccountService();

            const result = await getOneAccountService.execute(req.id, req.params.id);

            res.result = result;
            res.stat = 200;
            next();
        } catch (error) {
            res.status(400);
            next(error);
        }
    }
}