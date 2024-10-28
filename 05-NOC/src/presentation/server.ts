
import { LogRespositoryImpl } from "../infrastructure/repositories/log.repository";

import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';

import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-services";
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogSeverityLevel } from "../domain/entities/log-entity";
import { PostgresLogDataSource } from './../infrastructure/datasources/postgres-log.datasource';
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-multiple";


const fsLogRepository = new LogRespositoryImpl(
    new FileSystemDataSource()
);

const mongoLogRepository = new LogRespositoryImpl(
    new MongoLogDataSource()
);

const postgresLogRepository = new LogRespositoryImpl(
    new PostgresLogDataSource()
);

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


        // const log = logRepository.getLogs(LogSeverityLevel.low);
        // console.log(log);

       
        // CronService.createJob('*/15 * * * * *', 
        // () => {
        //     const url = 'https:google.com'

        //     new CheckService(
        //         logRepository,
        //         () => console.log(`${url} ok`),
        //         (error) => console.log(`Error on check: ${error} en ${url}`)
        //     ).execute(url);
            
        // });



        // CronService.createJob('*/15 * * * * *', 
        // () => {
        //     const url = 'https:google.com'

        //     new CheckServiceMultiple(
        //         [fsLogRepository, mongoLogRepository, postgresLogRepository],
        //         () => console.log(`${url} ok`),
        //         (error) => console.log(`Error on check: ${error} en ${url}`)
        //     ).execute(url);
            
        // });


        
    }
}