import { Request, Response, Next } from 'express';
import { GetAccountService } from '../../service/AccountService/GetAccountservice';

export class GetAccountController {
    async handle(req: Request, res: Response, next: Next) {
        try {
            const getAccountService = new GetAccountService();

            const usuario = req.id

            const result = await getAccountService.execute(usuario);

            res.result = result
            res.stat = 200
            next()
        } catch (error) {
            res.status(400)
            next(error)
        }
    }
}