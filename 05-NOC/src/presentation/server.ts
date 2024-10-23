import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRespositoryImpl } from "../infrastructure/repositories/log.repository";
import { CronService } from "./cron/cron-services";
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';


const fileSystemLogRepository = new LogRespositoryImpl(
    new FileSystemDataSource()
)


export class Server {

    public static start() {

        console.log('Server Started')

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