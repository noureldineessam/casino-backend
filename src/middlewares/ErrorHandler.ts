import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../validators/Validator';

import { createLogger, format, transports } from 'winston';

const logger = createLogger({
    level: 'error',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'error.log' })
    ],
});

export function ErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    logger.error(`Error: ${err.message}`, { error: err });
    if (err instanceof ValidationError) {
        res.status(400).json({ message: err.message, errors: err.errors });
    } else {
        res.status(500).json({ message: err.message });
    }
}