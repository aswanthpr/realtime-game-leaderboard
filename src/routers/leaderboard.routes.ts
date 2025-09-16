import {Router} from 'express';
import {LeaderboardController} from '../controllers/leaderboard.controller'
import {LeaderboardService} from '../service/implementation/leaderboard.service'
import { LeaderboardRepository } from '../repository/implementation/leaderboard.repository';

const router =Router();

const leaderboardRepo = new LeaderboardRepository();
const leaderService  = new LeaderboardService(leaderboardRepo);
const leaderController  = new LeaderboardController(leaderService);

router
.get("/",leaderController?.getLeaderboard.bind(leaderController))
.post("/player",leaderController.createPlayer.bind(leaderController))
.patch("/player",leaderController.updatePlayer.bind(leaderController))


export default router ;

