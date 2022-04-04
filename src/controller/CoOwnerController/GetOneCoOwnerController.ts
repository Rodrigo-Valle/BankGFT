import { Request, Response, Next } from 'express';
import { GetOneCoOwnerService } from '../../service/CoOwnerService/GetOneCoOwnerService';

export class GetOneCoOwnerController {
    async handle(req: Request, res: Response, next: Next) {
        try {
            const getOneCoOwnerService = new GetOneCoOwnerService();

            const result = await getOneCoOwnerService.execute(req.id, req.params.id);

            res.result = result
            res.stat = 200
            next()
        } catch (error) {
            res.status(400)
            next(error)
        }
    }
}