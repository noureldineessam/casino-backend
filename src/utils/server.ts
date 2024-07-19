import express from 'express';
import { logger } from './logger';

export const startServer = async (app: express.Application, port: number) => {
    try {
        app.listen(port, () => {
            logger.info(`Server is running on port ${port}`);
        });
    } catch (error) {
        logger.error('Failed to connect to MongoDB, shutting down the server', { error });
        process.exit(1);
    }
};
