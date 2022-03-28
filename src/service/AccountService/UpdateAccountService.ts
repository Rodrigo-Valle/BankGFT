import { AppDataSource } from "../../data-source";
import { Account } from "../../entity/Account";
import { StatusAccount } from "../../entity/enum/StatusAccountEnum";

interface IUpdateAccount {
    saldo: number,
    cartaoCredito: string,
    status: string,
    id: number
}

export class UpdateAccountService {
    async execute({ saldo, cartaoCredito, status, id }: IUpdateAccount) {
        const accountRepository = AppDataSource.getRepository(Account);

        const account = await accountRepository.findOneBy({ id: id });

        if (account === null) {
            throw new Error("Conta não localizada");
        }

        account.saldo = saldo;
        account.cartao_credito = cartaoCredito;
        account.status = <StatusAccount>status;

        accountRepository.save(account);

        return account;
    }
}