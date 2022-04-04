import { Request, Response, Next } from 'express';
import { nextTick } from 'process';
import { GetUserService } from '../../service/UserService/GetUserService';

export class GetUserController {
    async handle(req: Request, res: Response, next: Next) {

        try {
            const getUserService = new GetUserService();

            const result = await getUserService.execute(req.id);

            res.result = result
            res.stat = 200
            next()
        } catch (error) {
            res.status(400)
            next(error)
        }
    }
}