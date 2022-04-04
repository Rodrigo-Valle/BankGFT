import { Request, Response, Next } from 'express';
import { accountCreateSchema } from '../../schemas/AccountSchemas/account.create.schema';
import { CreateAccountService } from '../../service/AccountService/CreateAccountService';


export class CreateAccountController {
    async handle(req: Request, res: Response, next: Next) {
        try {
            await accountCreateSchema.validateAsync(req.body);

            const createAccountService = new CreateAccountService();

            const usuario = req.id;

            const result = await createAccountService.execute({
                saldo: req.body.saldo,
                cartaoCredito: req.body.cartaoCredito,
                usuario
            });


            res.result = result
            res.stat = 201
            next()
        } catch (error) {
            res.status(400)
            next(error)
        }
    }
}