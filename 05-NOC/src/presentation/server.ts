
import { LogRespositoryImpl } from "../infrastructure/repositories/log.repository";

import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';

import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";


const fileSystemLogRepository = new LogRespositoryImpl(
    new FileSystemDataSource()
)
const emailService = new EmailService( );

export class Server {

    public static start() {

        console.log('Server Started')

        // //todo: mandar email
        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute([
        //     'jeancreativo02@gmail.com',
        // ])


        // emailService.sendEmailWithFileSystemLogs([
        //     'jeancreativo02@gmail.com',
        // ])
        // emailService.sendEmail({
        //     to: 'jeancreativo02@gmail.com',
        //     subject: 'Server started',
        //     htmlBody: `
        //         <h3>Logs del sistema</h3>
        //         <p>El Server arranco de manera correcta</p>
        //     `,
        // })


        // Mandar email
       
        // CronService.createJob('*/5 * * * * *', 
        // () => {
        //     const url = 'https:google.com'
        //     new CheckService(
        //         fileSystemLogRepository,
        //         () => console.log(`${url} ok`),
        //         (error) => console.log(`Error on check: ${error} en ${url}`)
        //     ).execute(url);
            
        // });


        
    }
}