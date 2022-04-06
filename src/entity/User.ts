import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import * as jwt from 'jsonwebtoken'
import { Account } from "./Account"
import { CoOwner } from "./CoOwner"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column({
        unique: true
    })
    userName: string

    @Column()
    celular: string

    @Column('date')
    data_nasc: Date

    @Column({
        unique: true
    })
    email: string

    @Column()
    senha: string

    @Column()
    descricao: string

    @Column({
        nullable: true
    })
    codigo_reset: string

    @OneToMany(() => Account, (account) => account.correntista)
    contas: Account[]

    @OneToMany(() => CoOwner, (coOwner) => coOwner.usuario)
    coTitulares: CoOwner[]

    generateAuthToken = async function () {
        const user = this

        const token = await jwt.sign({ id: user.id }, 'tokenbank', { expiresIn: '1 day' });
        return token;
    }

    getUser = function () {
        const user = this

        delete user.senha;
        delete user.codigo_reset;

        return user;
    }
}
