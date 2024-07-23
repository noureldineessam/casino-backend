import { Request, Response, NextFunction } from 'express';
import { GameService } from '../services/GameService';

export class GameController {
    /**
     * Constructs a new UserController with the given UserService.
     * @param GameService - The service used to perform operations on users.
    */
    constructor(private gameService: GameService) { }



    /**
     * Roll the slot machine and return the user with the updated balance.
     * @param req - The HTTP request object. 
     */
    async roll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            let id = String(req.body.id);
            const user = await this.gameService.roll(id);
            if (!user) {
                res.status(400).json({ message: 'User has no balance' });
                return;
            }
            res.status(200).json(user);
        } catch (error: any) {
            next(error);
        }
    }

}