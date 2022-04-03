import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";

export class GetOneAccountService {
    async execute(id: number, accountId: number) {
        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOne({
            relations: {
                contas: true
            },
            select: {
                id: true,
                nome: true,
                email: true,
            },
            where: {
                id: id,
                contas: {
                    id: accountId
                }
            }
        });

        if (user === null) {
            throw new Error("Conta não localizada");
        }

        return user;
    }
}