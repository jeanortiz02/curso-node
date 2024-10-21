

export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export class LogEntity {

    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;

    constructor(
        messager: string,
        level: LogSeverityLevel
    ) {
        this.level = level;
        this.message = messager;
        this.createdAt = new Date();
    }
}