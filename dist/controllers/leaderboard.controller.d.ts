import type { Request, Response, NextFunction } from "express";
import type { IleaderboardService } from "../service/interface/leaderboard.service.interface.ts";
export declare class LeaderboardController {
    private leaderboardService;
    constructor(leaderboardService: IleaderboardService);
    getLeaderboard(req: Request, res: Response, next: NextFunction): Promise<void>;
    createPlayer(req: Request, res: Response, next: NextFunction): Promise<void>;
    updatePlayer(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=leaderboard.controller.d.ts.map