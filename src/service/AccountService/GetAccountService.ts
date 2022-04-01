import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";

export class GetAccountService {
    async execute(id: number) {
        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOneOrFail({
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


        return user;
    }
}