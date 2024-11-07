import { LogEntity, LogSeverityLevel } from "../../domain/entities/log-entity";
import { LogRespositoryImpl } from "./log.repository";



describe('log.respository.test.ts', () => { 

    const mockLogDataSource = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    const logRepository = new LogRespositoryImpl(mockLogDataSource);

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should savelog call the datasource with arguments', async() => { 

        const log = { level: LogSeverityLevel.high, message: 'helloo', origin: 'resp'} as LogEntity;

        await logRepository.saveLog(log)

        expect(mockLogDataSource.saveLog).toHaveBeenCalledWith( log )
     });

    test('should getLogs call the datasource with arguments', async() => { 

        const lowSeverity = LogSeverityLevel.low
        await logRepository.getLogs(lowSeverity);

        expect( mockLogDataSource.getLogs ).toHaveBeenCalledWith( lowSeverity)
     });
 })