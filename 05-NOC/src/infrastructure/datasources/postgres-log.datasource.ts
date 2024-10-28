import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDataSource } from "../../domain/datasources/log.datasources";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log-entity";


const prismaCliente = new PrismaClient();

const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,
}


export class PostgresLogDataSource implements LogDataSource {

    async saveLog(log: LogEntity): Promise<void> {

        const level = severityEnum[log.level];
        
        const newLog = await prismaCliente.logModel.create({

            data: {
                ...log,
                level: level
            },
        });
        //    await newLog.save();
           console.log('Mongo Log Created:', newLog.id)
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        
        const level = severityEnum[severityLevel];

        const dbLogs = await prismaCliente.logModel.findMany({
            where: {
                level
            },
        })

        return dbLogs.map(dbLog => LogEntity.fromObject(dbLog));
    }

}