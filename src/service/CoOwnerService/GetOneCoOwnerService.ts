import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";


export class GetOneCoOwnerService {
    async execute(id: number, idCoOwner: number) {
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
                id: id,
                coTitulares: {
                    id: idCoOwner
                }
            }
        });

        if (user === null) {
            throw new Error("Co-titular não localizado");
        }

        return user;
    }
}