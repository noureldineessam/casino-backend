import express from 'express'
import { GameController } from '../controllers/GameController';
import { GameService } from '../services/GameService';
import { UserService } from '../services/UserService';

import { HistoryService } from '../services/HistoryService';

import { UserRepository } from '../repositories/UserRepository';
import { HistoryRepository } from '../repositories/HistoryRepository';


const router = express.Router();

const gameService = new GameService(
    // new UserRepository(),
    new HistoryService(new HistoryRepository()),
    new UserService(new UserRepository())
);
const gameController = new GameController(gameService);


router.post('/roll', gameController.roll.bind(gameController));


export default router
