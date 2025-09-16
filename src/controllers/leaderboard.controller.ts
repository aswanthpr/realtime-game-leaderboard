import type { Request, Response, NextFunction } from "express";

import type { IleaderboardService } from "../service/interface/leaderboard.service.interface.ts";
import {HttpStatus,HttpResponse} from "../constants"
export class LeaderboardController {
  constructor(private leaderboardService: IleaderboardService) {}

  async getLeaderboard(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const {
        region = "",
        mode = "",
        limit = "10",
        page = "1",
        sort = "desc",
      } = req.query;

      const { data, pagination } =
        await this.leaderboardService.getLeaderboard(
          String(mode),
          String(region),
          parseInt(limit as string, 10),
          parseInt(page as string, 10),
          sort === "asc" ? "asc" : "desc"
        );

      res
        .status(HttpStatus?.OK)
        .json({
          success: true,
          message: HttpResponse?.RESOURCE_FOUND,
          data,
          pagination,
        });
    } catch (error: unknown) {
      next(error);
    }
  }
  async createPlayer(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, score, region, mode } = req.body;
      const data = await this.leaderboardService.createPlayer(
        name,
        score,
        region,
        mode
      );

      res
        .status(HttpStatus?.CREATED)
        .json({ success: true, message: HttpResponse?.CREATED, data });
    } catch (error: unknown) {
      next(error);
    }
  }

  async updatePlayer(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id, score } = req.body;
      const data = await this.leaderboardService.updatePlayer(id, score);

      res
        .status(HttpStatus?.OK)
        .json({ success: true, message: HttpResponse?.UPDATE_SUCCESS, data });
    } catch (error: unknown) {
      next(error);
    }
  }
}
