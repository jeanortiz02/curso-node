import mongoose from "mongoose";
import { envs } from "../../../config/plugins/envs.plugin";
import { MongoDataBase } from "../init";
import { LogModel } from "./log.model";




describe('log.model.test.ts', () => { 

    beforeAll(async() => {
        await MongoDataBase.connect({
            mongourl: envs.MONGO_URL,
            dbName: envs.MONGO_DB_NAME
        });
    })

    afterAll(() =>{
        mongoose.connection.close();
    })

    test('should return LogModel', async() => {
        
        const logData = {
            level: 'low',
            message: 'test-message',
            origin: 'log.model.test.ts',
        }

        const log = await LogModel.create(logData);

        expect(log).toEqual( expect.objectContaining({
            ...logData,
            id: expect.any(String),
            createdAt: expect.any(Date),
        }))

        await LogModel.findByIdAndDelete(log.id);

    });

    test('should return the schema object', () => {
        
        const schema = LogModel.schema.obj;

        // console.log( schema)

        expect( schema ).toEqual( expect.objectContaining({
            level: {
              type: expect.any(Function),
              required: true,
              enum: [ 'low', 'medium', 'high' ],
              default: 'low'
            },
            message: { type: expect.any(Function), required: true },
            createdAt: expect.any(Object),
            origin: { type: expect.any(Function) }
          }
        ))


    });
 })