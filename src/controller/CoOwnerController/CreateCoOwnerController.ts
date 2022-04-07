import { Request, Response, Next } from 'express';
import { coOwnerCreateSchema } from '../../schemas/CoOwnerSchemas/coowner.create.schema';
import { CreateCoOwnerService } from '../../service/CoOwnerService/CreateCoOwnerService';


export class CreateCoOwnerController {
    async handle(req: Request, res: Response, next: Next) {
        try {
            await coOwnerCreateSchema.validateAsync(req.body);

            const createCoOwnerService = new CreateCoOwnerService();

            const result = await createCoOwnerService.execute({
                id: req.id,
                nome: req.body.nome,
                email: req.body.email,
                dataNasc: req.body.dataNasc,
                celular: req.body.celular,
                descricao: req.body.descricao,
                cpf: req.body.cpf
            });

            res.result = result;
            res.stat = 201;
            next();
        } catch (error) {
            res.status(400);
            next(error);
        }
    }
}