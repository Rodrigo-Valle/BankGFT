import { Request, Response, Next } from 'express';
import { GetCoOwnerService } from '../../service/CoOwnerService/GetCoOwnerService';

export class GetCoOwnerController {
    async handle(req: Request, res: Response, next: Next) {
        try {
            const getCoOwnerService = new GetCoOwnerService();

            const result = await getCoOwnerService.execute(req.id);

            res.result = result;
            res.stat = 200;
            next();
        } catch (error) {
            res.status(400);
            next(error);
        }
    }
}