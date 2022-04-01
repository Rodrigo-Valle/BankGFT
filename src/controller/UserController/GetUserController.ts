import { Request, Response } from 'express';
import { GetUserService } from '../../service/UserService/GetUserService';

export class GetUserController {
    async handle(req: Request, res: Response) {

        try {
            const getUserService = new GetUserService();

            const result = await getUserService.execute(req.id);

            res.status(200).send({result});
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}