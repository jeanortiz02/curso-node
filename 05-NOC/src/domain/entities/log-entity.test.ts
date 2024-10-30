import { LogEntity, LogSeverityLevel } from "./log-entity";



describe('LogEntity', () => { 
    const datObj = {
        message: 'Test log',
        level: LogSeverityLevel.high,
        origin: 'log-entity.test.ts',
    }
    
    test('should create a LogEntity instance', () => {

        
        const log = new LogEntity(datObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(datObj.message);
        expect(log.level).toBe(datObj.level);
        expect(log.origin).toBe(datObj.origin);
        expect(log.createdAt).toBeInstanceOf(Date);
    });


    test('should create logEntity Instance from json', () => {
        const json = `{"level":"low","message":"Service https:google.com working","createdAt":"2024-10-30T14:41:30.668Z","origin":"check-service.ts"}`

        const log = LogEntity.fromJson(json);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe('Service https:google.com working');
        expect(log.level).toBe(LogSeverityLevel.low);
        expect(log.origin).toBe('check-service.ts');
        expect(log.createdAt).toBeInstanceOf(Date);
    });

    test('should create a LogEntity instance from object', () => {

        const log = LogEntity.fromObject(datObj);


        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(datObj.message);
        expect(log.level).toBe(datObj.level);
        expect(log.origin).toBe(datObj.origin);
        expect(log.createdAt).toBeInstanceOf(Date);
    });
 })