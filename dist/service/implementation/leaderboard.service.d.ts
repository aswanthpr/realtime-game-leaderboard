import { IplayerScore } from "../../models/playerScore.model";
import type { IleaderboardRepository } from "../../repository/interface/leaderboard.repo.interface.ts";
import type { IleaderboardService } from "../interface/leaderboard.service.interface.ts";
import { Types } from "mongoose";
import { GameMode, Region } from "../../types/types";
import { Ipagination } from "../../types/interfaces";
export declare class LeaderboardService implements IleaderboardService {
    private repo;
    constructor(repo: IleaderboardRepository);
    createPlayer(name: string, score: number, region: Region, mode: GameMode): Promise<IplayerScore[] | []>;
    updatePlayer(id: Types.ObjectId, score: number): Promise<IplayerScore[] | []>;
    getLeaderboard(mode: string, region: string, limit: number, page: number, sort: "asc" | "desc"): Promise<{
        leaderboard: IplayerScore[] | [];
        pagination: Ipagination;
    }>;
}
//# sourceMappingURL=leaderboard.service.d.ts.map