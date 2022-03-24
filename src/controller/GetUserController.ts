import { Request, Response } from 'express';
import { GetUserService } from '../service/GetUserService';

export class GetUserController {
    async handle(req: Request, res: Response) {

        try {
            const getUserService = new GetUserService();

            const usuario = await getUserService.execute(req.id);

            res.status(200).send(usuario);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}