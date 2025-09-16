import { Types } from "mongoose";
import type { IleaderboardRepository } from "../interface/leaderboard.repo.interface";
import { IplayerScore, playerScoreModel } from "../../models/playerScore.model";
import { GameMode, Region } from "../../types/types";
import { BaseRepository } from "../base.repository";

export class LeaderboardRepository extends BaseRepository<IplayerScore> implements IleaderboardRepository {
  constructor(
) {
    super(playerScoreModel)
    
}
 async createPlayer(
    name: string,
    score: number,
    region: Region,
    mode: GameMode,
    date: Date
  ): Promise<IplayerScore> {
    return this.create({ name, score, region, mode, expireAt: date } as IplayerScore);
  }

  async findByName(name: string): Promise<IplayerScore | null> {
    return this.findOne({ name });
  }

  async updateScore(_id: Types.ObjectId, score: number): Promise<IplayerScore | null> {
    return this.updateById(_id, { $set: { score } });
  }

  async topTen(
    mode: string = "",
    region: string = "",
    _limit: number = 10,
    _page: number = 1,
    sort: "asc" | "desc" = "desc"
  ): Promise<{data:IplayerScore[]|[],total:number}> {
    const query: any = {};
    if (mode) query.mode = mode;
    if (region) query.region = region;

    const sortOrder = sort === "asc" ? 1 : -1;

    const { data,total } = await this.paginate(query, _limit, _page, { score: sortOrder });
    return { data,total };
  }

}
