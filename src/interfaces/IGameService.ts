import { User } from '../models/User/User';
import { UserUpdateDTO } from '../models/User/dto/UserUpdateDTO';

/**
 * Interface representing a repository for `Game` entities.
 */
export interface IGameService {
    roll(id: string): Promise<any>;
}
