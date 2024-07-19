import { createLogger, format, transports } from 'winston';

const logLevel = process.env.NODE_ENV === 'production' ? 'info' : 'debug';

 export const logger = createLogger({
    level: logLevel,
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.Console()
    ],
});

