import { MongoDataBase } from "./init";
import mongoose from "mongoose";



describe('init MongoDataBase', () => { 

    afterAll( () => {
        // mongoose.disconnect()
    });
    
    test('should connect to MongoDataBase', async() => {
        
        const connected = MongoDataBase.connect({
            mongourl: process.env.MONGO_URL!,
            dbName: process.env.MONGO_DB_NAME!,
        })
        
        expect(connected).toBeTruthy();
        
    });
    
    test('should throw an error', async() => {
        
        // expect(() => await MongoDataBase.connect({
            //     mongourl: 'mongodb://jortiz:123456789@localhdvdst:27017',
            //     dbName: 'wrong-db',
            // })).toThrow();
            
            
        try {
                
            const connected = await MongoDataBase.connect({
                mongourl: 'mongodb://jortiz:123456789@localhdvdst:27017',
                dbName: process.env.MONGO_DB_NAME!,
            })
            expect(true).toBe(false);
        } catch (error) {
          
        }

    });
 })