import mongoose from "mongoose";

interface Options {
    mongourl: string;
    dbName: string;
}


export class MongoDatabase {

    static async connect(option: Options) {
        const { mongourl, dbName } = option

        try {
            await mongoose.connect(mongourl, {
                dbName: dbName
            })
            // console.log('Connected to Mongo');
            return true;
        } catch (error) {
            console.log('Mongo database connection error');
            throw error;
    
        }
    }
}