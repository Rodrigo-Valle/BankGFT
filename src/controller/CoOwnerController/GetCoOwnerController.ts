import { Request, Response } from 'express';
import { GetCoOwnerService } from '../../service/CoOwnerService/GetCoOwnerService';

export class GetCoOwnerController {
    async handle(req: Request, res: Response) {
        try {
            const getCoOwnerService = new GetCoOwnerService();

            const result = await getCoOwnerService.execute(req.id);

            res.status(200).send({result});
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}