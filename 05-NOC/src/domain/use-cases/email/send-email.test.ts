import { LogEntity } from "../../entities/log-entity";
import { SendEmailLogs } from "./send-email-logs";



describe('send-email-logs', () => { 

    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true)
    }

    const mockLogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const sendEmailLogs = new SendEmailLogs(
        mockEmailService as any,
        mockLogRepository
    )

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should call sednEmail and saveLog', async() => {
       
        

        const result = await sendEmailLogs.execute('jortiz@iibi.gob.do');

        expect( result ).toBeTruthy();
        expect ( mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect ( mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect( mockLogRepository.saveLog).toHaveBeenCalledWith({
            "createdAt": expect.any(Date),
            "level": "low",
            "message": "Log Email Sent",
            "origin": "send-email-logs.ts",
        })

    });


    test('should log in case of error', async() => {
       
        mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false)

        const result = await sendEmailLogs.execute('jortiz@iibi.gob.do');

        expect( result ).toBeFalsy();
        expect ( mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect ( mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect( mockLogRepository.saveLog).toHaveBeenCalledWith({
            "createdAt": expect.any(Date),
            "level": "high",
            "message": "Error: Email log not sent",
            "origin": "send-email-logs.ts",
        })

    });
 })