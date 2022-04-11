import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";

export class GetCoOwnerService {
    async execute(id: number) {
        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOne({
            relations: {
                coTitulares: true
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

        if (user === null) {
            throw new Error("Co-titular não localizado");
        }
        return user;
    }
}