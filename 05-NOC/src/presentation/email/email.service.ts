
import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log-entity';


interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachements?: Attachment[] 
}

interface Attachment {
    filename: string;
    path: string;
}

//todo: Attachements

export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    })

    constructor() {}

    async sendEmail(options: SendMailOptions): Promise<boolean> {

        const { to, subject, htmlBody, attachements = [] } = options;

        try {
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachements
            })

            return true;
        } catch (error) {

            return false;
        }
    }





    async sendEmailWithFileSystemLogs ( to: string | string[] ) {

        const subject = 'Logs del servidor'
        const htmlBody = `<h1>Archivos de logs del Servidor</h1>
        <p>En este correo encontrarás los últimos logs del sistema.</p>
        <p>Recuerda que los logs pueden contener información confidencial.</p>`

        const attachements:Attachment[] = [
            {
                filename: 'logs.txt',
                path: './logs/logs-all.log'
            },

            {
                filename: 'logs_medium.txt',
                path: './logs/logs-medium.log'
            },

            {
                filename: 'logs_high.txt',
                path: './logs/logs-high.log'
            }

        ];

        this.sendEmail({
            to,
            subject,
            htmlBody,
            attachements
        })

        return true;
    }
}