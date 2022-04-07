import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, } from "typeorm"
import { User } from "./User"

@Entity()
export class CoOwner {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column()
    cpf: string

    @Column()
    email: string

    @Column('date')
    data_nasc: Date

    @Column()
    celular: string

    @Column()
    descricao: string

    @ManyToOne(() => User, (user) => user.id)
    usuario: User

    getCoOwner = function () {
        const coOwner = this

        delete coOwner.usuario.senha;
        delete coOwner.usuario.codigo_reset;

        return coOwner;
    }
}