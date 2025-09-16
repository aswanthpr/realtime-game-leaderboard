import { Types } from "mongoose";
import { IplayerScore } from "../../models/playerScore.model";
import { GameMode, Region } from "../../types/types";
export interface IleaderboardRepository {
    createPlayer(name: string, score: number, region: Region, mode: GameMode, data: Date): Promise<IplayerScore>;
    findByName(name: string): Promise<IplayerScore | null>;
    updateScore(id: Types.ObjectId, score: number): Promise<IplayerScore | null>;
    topTen(mode?: string, region?: string, limit?: number, page?: number, sort?: "asc" | "desc"): Promise<IplayerScore[] | []>;
    countDocs(mode: string, region: string): Promise<number>;
}
//# sourceMappingURL=leaderboard.repo.interface.d.ts.map