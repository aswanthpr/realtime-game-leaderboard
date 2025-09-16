import { Types } from "mongoose";
import { IplayerScore } from "../../models/playerScore.model";
import { GameMode, Region } from "../../types/types";
import { Ipagination } from "../../types/interfaces";
export interface IleaderboardService {
    createPlayer(name: string, score: number, region: Region, mode: GameMode): Promise<IplayerScore[] | []>;
    updatePlayer(id: Types.ObjectId, score: number): Promise<IplayerScore[] | []>;
    getLeaderboard(mode: string, region: string, limit: number, page: number, sort: "asc" | "desc"): Promise<{
        leaderboard: IplayerScore[] | [];
        pagination: Ipagination;
    }>;
}
//# sourceMappingURL=leaderboard.service.interface.d.ts.map