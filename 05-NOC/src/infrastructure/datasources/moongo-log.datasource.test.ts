import mongoose from "mongoose";
import { envs } from "../../config/plugins/envs.plugin";
import { MongoDataBase } from '../../data/mongo/init';
import { MongoLogDataSource } from "./mongo-log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log-entity";
import { LogModel } from "../../data/mongo";



describe('mongo-log', () => { 
    const logDataSource = new MongoLogDataSource();
    const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: 'This is a test log',
        origin: 'test.ts'
    })

    beforeAll(async() => {

        await MongoDataBase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongourl: envs.MONGO_URL,
        })
    })
    afterEach(async() => {
        await LogModel.deleteMany()
    })

    afterAll(async() => {
        mongoose.connection.close();
    })

    test('should create a log', async() => {
        
        const logSpy = jest.spyOn(console, 'log');


        await logDataSource.saveLog(log);


        expect(logSpy).toHaveBeenCalledWith("Mongo Log Created:", expect.any(String));
        logSpy.mockRestore();


    });

    test('should getLogs', async() => {
        
        await logDataSource.saveLog(log);
        
        
        const logs = await logDataSource.getLogs(LogSeverityLevel.high);

        expect(logs.length).toBe(1);
        // expect(logs[0]).toBeInstanceOf(LogEntity);
        expect(logs[0].level).toBe(LogSeverityLevel.high);
    });
 })