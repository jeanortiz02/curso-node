

export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export interface LogEntityOptions {
    level: LogSeverityLevel
    message: string;
    origin: string;
    createdAt?: Date;
}

export class LogEntity {

    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor(options : LogEntityOptions) {

        const { level, message, origin, createdAt = new Date() } = options;

        this.level = level;
        this.message = message;
        this.createdAt = createdAt;
        this.origin = origin;
    }

    static fromJson = (json: string = '{}'):LogEntity => {

        json = ( json === '') ? '{}' : json;

       const { message, level, createdAt, origin } = JSON.parse(json);

       const log = new LogEntity({
            level, 
            message, 
            origin, 
            createdAt: new Date(createdAt),
       });
       log.createdAt = new Date(createdAt);
       return log;
    //    if ( !message ) throw new Error(`Message is required`);
    }

    static fromObject = (object: { [key: string] : any } ): LogEntity => {
        const { message, level, createdAt, origin } = object;

        const log = new LogEntity({
            level, 
            message, 
            origin, 
            createdAt
        })

        return log;
    }
}