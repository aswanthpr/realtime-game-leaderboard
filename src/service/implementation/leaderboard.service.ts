import { Types } from "mongoose";
import { startOfDay, addDays } from "date-fns";
import { IplayerScore } from "../../models/playerScore.model";
import { HttpResponse,HttpStatus } from "../../constants";
import type { IleaderboardRepository } from "../../repository/interface/leaderboard.repo.interface.ts";
import { createHttpError } from "../../utils/http.error.util";
import type { IleaderboardService } from "../interface/leaderboard.service.interface.ts";
import { getIO } from "../../socket";
import { GameMode, Region } from "../../types/types";
import { Ipagination } from "../../types/interfaces";
import { getRedis} from "../../configs";

export class LeaderboardService implements IleaderboardService {
  constructor(private repo: IleaderboardRepository) {}
  async createPlayer(
    name: string,
    score: number,
    region: Region,
    mode: GameMode
  ): Promise<IplayerScore|{}> {
    if (!name || !score || !region || !mode) {
      throw createHttpError(
        HttpStatus?.BAD_REQUEST,
        HttpResponse?.FIELDS_REQUIRED
      );
    }

    const checkUser = await this.repo.findByName(name);
    if (checkUser) {
      throw createHttpError(
        HttpStatus?.BAD_REQUEST,
        HttpResponse?.PLAYER_EXIST
      );
    }

    const now = new Date();
    const tomorrowMidNight = addDays(startOfDay(now), 1);

    const result = await this.repo.createPlayer(
      name,
      score,
      region,
      mode,
      tomorrowMidNight
    );
    if (!result) {
      throw createHttpError(
        HttpStatus?.NOT_FOUND,
        HttpResponse?.OPERATION_FAILED
      );
    }

    getIO().emit("leaderboard:update", result );
    return result;
  }
  async updatePlayer(
    id: Types.ObjectId,
    score: number
  ): Promise<IplayerScore | {}> {
    if (!id || !score) {
      throw createHttpError(
        HttpStatus?.BAD_REQUEST,
        HttpResponse?.FIELDS_REQUIRED
      );
    }
    const updateUser = await this.repo.updateScore(id, score);

    if (!updateUser) {
      throw createHttpError(
        HttpStatus?.BAD_REQUEST,
        HttpResponse?.FAILED_TO_UPDATE
      );
    }

    getIO().emit("leaderboard:update",updateUser);
    return updateUser
  }

  async getLeaderboard(
    mode: string,
    region: string,
    limit: number,
    page: number,
    sort: "asc" | "desc"
  ): Promise<{ data: IplayerScore[] | []; pagination: Ipagination }> {
    const redis = getRedis();
    //cache key
    const cacheKey = `leaderboard:${mode}:${region}:${limit}:${page}:${sort}`;

    const cached = await redis.get(cacheKey);

    //try to take from the cache
    if (cached) {
      console.log("⚡ Cache hit:", cacheKey);
      const parsed = JSON.parse(cached);
      return parsed;
    }
    const { data, total } = await this.repo.topTen(
      mode,
      region,
      limit,
      page,
      sort
    );

    const pagination = {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
    const response = { data, pagination };
    //caching for 1 minutes
    await redis.set(cacheKey, JSON.stringify(response), "EX", 60);
    getIO().emit("leaderboard:fetch", { data, pagination });
    return response;
  }
}
