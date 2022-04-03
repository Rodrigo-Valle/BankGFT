import { AppDataSource } from "../../data-source";
import { Account } from "../../entity/Account";
import { User } from "../../entity/User";

export const fakeAccount = {
    async createAccount(user: User) {
        const accountRepository = await AppDataSource.getRepository(Account);

        const account = new Account();
        account.cartao_credito = "4539644564076054";
        account.correntista = user;

        await accountRepository.save(account);

        return account;
    }
}
