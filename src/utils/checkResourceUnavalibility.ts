
import { Response } from 'express';

export const checkResourceUnavalibility = (res: Response, resource: any, message: string): boolean => {

    if (resource === null) {
        res.status(404).json({ message }).end();
        return true;
    }
    return false;
}