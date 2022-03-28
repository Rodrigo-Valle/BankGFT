import { Request, Response } from 'express';
import { coOwnerCreateSchema } from '../../schemas/CoOwnerSchemas/coowner.create.schema';
import { CreateCoOwnerService } from '../../service/CoOwnerService/CreateCoOwnerService';


export class CreateCoOwnerController {
    async handle(req: Request, res: Response) {
        try {
            await coOwnerCreateSchema.validateAsync(req.body);

            const createCoOwnerService = new CreateCoOwnerService();

            const result = await createCoOwnerService.execute({
                id: req.id,
                nome: req.body.nome,
                email: req.body.email,
                dataNasc: req.body.dataNasc,
                celular: req.body.celular,
                descricao: req.body.descricao
            });

            res.status(201).send(result);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}