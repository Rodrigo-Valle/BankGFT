import { AppDataSource } from "../../data-source";
import { Account } from "../../entity/Account";
import { StatusAccount } from "../../entity/enum/StatusAccountEnum";
import { User } from "../../entity/User";

interface IAccount {
    saldo?: number,
    cartaoCredito: string,
    usuario: number
}

export class CreateAccountService {
    async execute({ saldo, cartaoCredito, usuario }: IAccount) {
        const userRepository = AppDataSource.getRepository(User);
        const accountRepository = AppDataSource.getRepository(Account);

        const user = await userRepository.findOneBy({ id: usuario });

        if (!user) {
            throw new Error('Usuario não encontrado');
        }

        const account = new Account();
        account.saldo = saldo;
        account.cartao_credito = cartaoCredito;
        account.correntista = user;

        await accountRepository.save(account);

        return account.getAccount();
    }
}