
import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDataBase } from "./data/mongo";
import { LogSeverityLevel } from "./domain/entities/log-entity";
import { Server } from "./presentation/server";



(async() => {
    main();
}) ();

async function main () {

    await MongoDataBase.connect({
        mongourl: envs.MONGO_URL, 
        dbName: envs.MONGO_DB_NAME,
    });

    // const prisma = new PrismaClient();
    // const newLog = await prisma.logModel.create({
    //     data: {
    //         level: 'MEDIUM',
    //         message: 'Prisma Log',
    //         origin: 'app.ts',
    //     }

    // })
    
    // console.log(newLog)
    Server.start();
}