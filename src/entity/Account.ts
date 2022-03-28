import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { StatusAccount } from "./enum/StatusAccountEnum"
import { User } from "./User"

@Entity()
export class Account {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        default: 0.00
    })
    saldo: number

    @Column()
    cartao_credito: string

    @Column({
        type: "enum",
        enum: StatusAccount,
        default: StatusAccount.ATIVA
    })
    status: StatusAccount

    @ManyToOne(() => User, (user) => user.id)
    correntista: User


    getAccount = function () {
        const account = this

        delete account.correntista.senha;
        delete account.correntista.codigo_reset;

        return account;
    }
}
