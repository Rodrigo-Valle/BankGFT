import { Request, Response } from 'express';
import { GetOneCoOwnerService } from '../../service/CoOwnerService/GetOneCoOwnerService';

export class GetOneCoOwnerController {
    async handle(req: Request, res: Response) {
        try {
            const getOneCoOwnerService = new GetOneCoOwnerService();

            const result = await getOneCoOwnerService.execute(req.id, req.params.id);

            res.status(200).send(result);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}