import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-services";



export class Server {

    public static start() {
       
        CronService.createJob('*/5 * * * * *', 
        () => {
            const url = 'https:google.com'
            new CheckService(
                () => console.log(`${url} ok`),
                (error) => console.log(`Error on check: ${error} en ${url}`)
            ).execute(url);
            
        });


        
    }
}