import { AppDataSource } from "../../data-source";
import { Account } from "../../entity/Account";

export class DeleteAccountService {
    async execute(id: number) {
        const accountRepository = AppDataSource.getRepository(Account);

        const account = await accountRepository.findOneBy({ id: id });

        if (account === null) {
            throw new Error("Conta não localizada");
        }

        await accountRepository.remove(account);

        return account;
    }
}