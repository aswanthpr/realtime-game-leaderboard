import type { IleaderboardRepository } from "../interface/leaderboard.repo.interface.ts";
import { IplayerScore } from "../../models/playerScore.model";
import { Types } from "mongoose";
import { GameMode, Region } from "../../types/types.js";
export declare class LeaderboardRepository implements IleaderboardRepository {
    constructor();
    createPlayer(name: string, score: number, region: Region, mode: GameMode, date: Date): Promise<IplayerScore>;
    findByName(name: string): Promise<IplayerScore | null>;
    updateScore(id: Types.ObjectId, score: number): Promise<IplayerScore | null>;
    topTen(mode?: string, region?: string, limit?: number, page?: number, sort?: "asc" | "desc"): Promise<IplayerScore[] | []>;
    countDocs(mode: string, region: string): Promise<number>;
}
//# sourceMappingURL=leaderboard.repository.d.ts.map