import { CronService } from "./cron-services"



describe('cron-services.test.ts', () => { 

    const mockTick = jest.fn();
    test('should creat a job', (done) => { 
        const job = CronService.createJob('* * * * * *', mockTick);

        setTimeout(() => {

            expect(mockTick).toHaveBeenCalledTimes(2)
            job.stop(); 
            done()
        }, 2000)
     })
 })