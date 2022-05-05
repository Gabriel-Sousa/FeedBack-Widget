import { MailAdapter, SendMailData  } from "../mail-adapters";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "00f55538e19c5c",
        pass: "09702c6fe381f4"
    }
});


export class NodemailerMailAdapter implements MailAdapter{
    async sendMail({subject, body}: SendMailData){
        await transport.sendMail({
        from: "Equipe Feedget <oi@feedget.com>",
        to: "Gabriel Sousa <bielslima04@gmail.com>",
        subject: subject,
        html: body
    })
    }
}