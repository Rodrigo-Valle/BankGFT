import { cp } from "fs";
import { AppDataSource } from "../../data-source";
import { CoOwner } from "../../entity/CoOwner";
import { User } from "../../entity/User";

interface ICoOwner {
    nome: string,
    email: string,
    dataNasc: string,
    celular: string,
    descricao: string,
    id: number,
    cpf: string
}

export class CreateCoOwnerService {
    async execute({ nome, email, dataNasc, celular, descricao, id, cpf }: ICoOwner) {
        const userRepository = AppDataSource.getRepository(User);
        const coOwnerRepository = AppDataSource.getRepository(CoOwner);

        const user = await userRepository.findOneBy({ id: id });

        const coOwner = new CoOwner();

        console.log(dataNasc)

        const dataNascUtf = dataNasc + 'T00:00:00-03:00'
        coOwner.nome = nome;
        coOwner.email = email;
        coOwner.data_nasc = new Date(dataNascUtf);
        coOwner.celular = celular;
        coOwner.descricao = descricao;
        coOwner.usuario = user;
        coOwner.cpf = cpf;

        console.log(coOwner.data_nasc)
        await coOwnerRepository.save(coOwner);

        return coOwner.getCoOwner();
    }
}