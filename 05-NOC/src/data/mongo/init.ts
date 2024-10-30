import mongoose from "mongoose";


interface ConnectionOptions {
    mongourl: string;
    dbName: string;
}

export class MongoDataBase {

    static async connect(options : ConnectionOptions) {

        const { mongourl, dbName } = options;

        try {
            
            await mongoose.connect(mongourl, {
                dbName: dbName
            });

            // console.log('Mongoose connection');
            return true;

        } catch (error) {
            // console.error(`Error connecting to MongoDB`);
            throw error;
        }
    }
}