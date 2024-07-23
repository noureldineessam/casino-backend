import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';
import { validateUserParams, validateUrlParams } from '../validators/Validator';
import { checkResourceUnavalibility } from '../utils/checkResourceUnavalibility';
/**
 * The UserController class handles HTTP requests related to `User` entities.
 * It interacts with the UserService to perform operations such as retrieving, 
 * creating, updating, and deleting users.
 */
export class UserController {
    /**
     * Constructs a new UserController with the given UserService.
     * @param userService - The service used to perform operations on users.
     */
    constructor(private userService: UserService) { }

    /**
     * Handles HTTP GET requests to retrieve a user by its ID.
     * Validates the URL parameters, retrieves the user using its ID, 
     * and responds with a JSON object of the user if successful. Passes errors to the next middleware if it fails.
     * @param req - The HTTP request object.
     * @param res - The HTTP response object.
     * @param next - The next middleware function.
     */
    async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            validateUrlParams(req.params);
            const id = String(req.params.id);
            const user = await this.userService.getUserById(id);

            if (checkResourceUnavalibility(res, user, 'User not found'))
                return
            res.status(200).json(user);
        } catch (error: any) {
            next(error);
        }
    }

    /**
     * Handles HTTP POST requests to create a new user.
     * Validates the request body, creates the user using the UserService, 
     * and responds with a JSON object of the newly created user. Passes errors to the next middleware if it fails.
     * @param req - The HTTP request object.
     * @param res - The HTTP response object.
     * @param next - The next middleware function.
     */
    async saveUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userReq = req.body || null;
            validateUserParams(userReq);
            const user = await this.userService.saveUser(userReq);
            if (checkResourceUnavalibility(res, user, 'User not found'))
                return
            res.status(201).json(user);
        } catch (error: any) {
            next(error);
        }
    }

    /**
     * Handles HTTP DELETE requests to delete a user by its ID.
     * Validates the URL parameters, deletes the user using its ID, 
     * and responds with a status code indicating successful deletion. Passes errors to the next middleware if it fails.
     * @param req - The HTTP request object.
     * @param res - The HTTP response object.
     * @param next - The next middleware function.
     */
    async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            validateUrlParams(req.params);
            let user = await this.userService.deleteUser(String(req.params.id));
            if (checkResourceUnavalibility(res, user, 'User not found'))
                return
            res.status(204).json({ message: 'User is successfully deleted' });
        } catch (error: any) {
            next(error);
        }
    }

    /**
     * Handles HTTP PUT requests to login a user by its ID.
     * Validates the URL parameters, logs in the user using its ID, 
     * and responds with a status code indicating successful login. Passes errors to the next middleware if it fails.
     * @param req - The HTTP request object.
     * @param res - The HTTP response object.
     * @param next - The next middleware function.
     */
    async loginUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            validateUrlParams(req.body);

            let user = await this.userService.loginUser(String(req.body.id));
            if (checkResourceUnavalibility(res, user, 'User not found'))
                return
            res.status(200).json({ message: 'User is successfully logged in' });
        } catch (error: any) {
            next(error);
        }
    }

    /**
     * Handles HTTP PUT requests to logout a user by its ID.
     * Validates the URL parameters, logs out the user using its ID, 
     * and responds with a status code indicating successful logout. Passes errors to the next middleware if it fails.
     * @param req - The HTTP request object.
     * @param res - The HTTP response object.
     * @param next - The next middleware function.
     */
    async logoutUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            validateUrlParams(req.body);

            let user = await this.userService.logoutUser(String(req.body.id));
            if (checkResourceUnavalibility(res, user, 'User not found'))
                return
            res.status(200).json({ message: 'User is successfully logged out' });
        } catch (error: any) {
            next(error);
        }
    }

    /**
     * Handles HTTP PUT requests to cashout a user by its ID.
     * Validates the URL parameters, cashout the user using its ID, 
     * and responds with a status code indicating successful cashout. Passes errors to the next middleware if it fails.
     * @param req - The HTTP request object.
     * @param res - The HTTP response object.
     * @param next - The next middleware function.
     */
    async cashoutUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            validateUrlParams(req.body);
            let id = String(req.body.id)

            let isCashoutSuccessful = await this.userService.cashoutUser(id);
            if (checkResourceUnavalibility(res, isCashoutSuccessful, 'User not found'))
                return
            if (isCashoutSuccessful == -1)
                res.status(400).json({ message: 'Low Balance' });
            else
                res.status(200).json({ message: 'User is successfully cashout' });

        } catch (error: any) {
            next(error);
        }
    }

    /**
     * Handles HTTP GET requests to get user history.
     * Validates the URL parameters, get user history using its ID,
     * and responds with a JSON object of the user history if successful. Passes errors to the next middleware if it fails.
     * @param req - The HTTP request object.
     * @param res - The HTTP response object.
     * @param next - The next middleware function.
     */
    async getHistoryByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            validateUrlParams(req.params);
            const id = String(req.params.id);
            const history = await this.userService.getHistoryByUserId(id);

            if (checkResourceUnavalibility(res, history, 'User not found'))
                return
            res.status(200).json(history);
        } catch (error: any) {
            next(error);
        }
    }
}