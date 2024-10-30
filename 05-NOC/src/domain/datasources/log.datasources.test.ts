import { LogEntity, LogSeverityLevel } from '../entities/log-entity';
import { LogDataSource } from './log.datasources';



describe('log.datasource.ts', () => { 

    const newLog = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'test-message',
        origin: 'log.datasource.ts'
    })

    class MockLogDataSource implements LogDataSource {
        async saveLog(log: LogEntity): Promise<void> {
            return; 
        }
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog];
        }

    }

    test('should test the abstract class', async() => {
        
        const mockLogDataSource = new MockLogDataSource();

        expect( mockLogDataSource).toBeInstanceOf( MockLogDataSource );
        expect( mockLogDataSource).toHaveProperty( 'saveLog' );
        expect( mockLogDataSource).toHaveProperty( 'getLogs' );
        expect( typeof mockLogDataSource.getLogs ).toBe( 'function' );
        expect( typeof mockLogDataSource.saveLog ).toBe( 'function' );

        await mockLogDataSource.saveLog(newLog );

        const logs = await mockLogDataSource.getLogs(LogSeverityLevel.low);

        expect( logs ).toHaveLength(1);
        expect( logs[0] ).toBeInstanceOf(LogEntity);
    });
    
 })