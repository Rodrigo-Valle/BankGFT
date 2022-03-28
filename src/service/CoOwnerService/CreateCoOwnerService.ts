import { AppDataSource } from "../../data-source";
import { CoOwner } from "../../entity/CoOwner";
import { User } from "../../entity/User";

interface ICoOwner {
    nome: string,
    email: string,
    dataNasc: string,
    celular: string,
    descricao: string,
    id: number
}

export class CreateCoOwnerService {
    async execute({ nome, email, dataNasc, celular, descricao, id }: ICoOwner) {
        const userRepository = AppDataSource.getRepository(User);
        const coOwnerRepository = AppDataSource.getRepository(CoOwner);

        const user = await userRepository.findOneBy({ id: id });

        const coOwner = new CoOwner();

        coOwner.nome = nome;
        coOwner.email = email;
        coOwner.data_nasc = new Date(dataNasc);
        coOwner.celular = celular;
        coOwner.descricao = descricao;
        coOwner.usuario = user;

        await coOwnerRepository.save(coOwner);

        return coOwner.getCoOwner();
    }
}