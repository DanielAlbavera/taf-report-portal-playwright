import { createLogger, format, transports } from 'winston';
import winston from 'winston/lib/winston/config';

winston.addColors({
    error: 'red',
    debug: 'gray',
    warn:  'yellow',
    data:  'blue',
    info:  'green'
});

export const logger = createLogger({
    levels: {
        error: 0,
        debug: 1,
        warn:  2,
        data:  3,
        info:  4
    },
    transports: [
        new transports.File({
            maxsize:  5120000,
            maxFiles: 5,
            filename: `${__dirname}/../logs/log-file.log`,
            format: format.combine(
                format.simple(),
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                format.printf( info => `[${info.timestamp}] ${info.level}: ${info.message}`)
            )
        }),
        new transports.Console({
            format: format.combine(
                format.colorize({ level: true }),
                format.simple(),
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                format.printf( info => `[${info.timestamp}] ${info.level}: ${info.message}`)
            )
        }),
    ],
});