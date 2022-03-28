import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";

export class GetUserService {
    async execute(id: number) {
        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOneBy({ id: id });

        if (!user) {
            throw new Error("Usuario não encontrado");
        }

        return user.getUser();
    }
}