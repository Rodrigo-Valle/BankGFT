import * as nodemailer from 'nodemailer';
import { smtp } from '../config/smtp';



export async function execute(codigo: string, email: string) {
    const transporter = nodemailer.createTransport({
        host: smtp.host,
        port: smtp.port,
        secure: smtp.secure,
        auth: {
            user: smtp.user,
            pass: smtp.pass
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    await transporter.sendMail({
        subject: 'Redefinição de senha',
        from: 'Bank Api',
        to: [email],
        html: `<html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Redefinicao de Senha</title>
        </head>
        <body>
            <h1>Redefinição de senha</h1>
        
            <h3>segue o código para alteração da senha: </h3>
        
            <p>${codigo}</p>
        </body>
        </html>`
    });
}