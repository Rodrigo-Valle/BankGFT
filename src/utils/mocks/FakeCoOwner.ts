import { AppDataSource } from "../../data-source";
import { CoOwner } from "../../entity/CoOwner";
import { User } from "../../entity/User";

export const fakeCoOwner = {
    async createCoOwner(user: User) {
        const coOwnerRepository = await AppDataSource.getRepository(CoOwner);

        const coOwner = new CoOwner();
        coOwner.nome = 'coowner'
        coOwner.email = 'coowner@email.com'
        coOwner.celular = '987654321'
        coOwner.data_nasc = new Date('1991-03-15')
        coOwner.descricao = 'coowner'
        coOwner.cpf = "12345678901"
        coOwner.usuario = user;

        await coOwnerRepository.save(coOwner);

        return coOwner;
    }
}