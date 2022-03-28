import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";

export class GetAccountService {
    async execute(id: number) {
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
                id: id
            }
        });

        if (user.contas.length === 0) {
            throw new Error("Usuario não possui contas");
        }
        return user;
    }
}