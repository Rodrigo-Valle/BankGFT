import { Request, Response } from 'express';
import { accountCreateSchema } from '../../schemas/AccountSchemas/account.create.schema';
import { CreateAccountService } from '../../service/AccountService/CreateAccountService';


export class CreateAccountController {
    async handle(req: Request, res: Response) {
        try {
            await accountCreateSchema.validateAsync(req.body);

            const createAccountService = new CreateAccountService();

            const result = await createAccountService.execute({
                saldo: req.body.saldo,
                cartaoCredito: req.body.cartaoCredito,
                usuario: req.id
            });

            res.status(201).send(result);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}