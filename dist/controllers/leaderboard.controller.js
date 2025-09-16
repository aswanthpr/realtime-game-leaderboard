"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardController = void 0;
const httpStatus_1 = require("../constants/httpStatus");
const httpResponse_1 = require("../constants/httpResponse");
class LeaderboardController {
    constructor(leaderboardService) {
        this.leaderboardService = leaderboardService;
    }
    async getLeaderboard(req, res, next) {
        try {
            const { region = "", mode = "", limit = "10", page = "1", sort = "desc", } = req.query;
            const { leaderboard, pagination } = await this.leaderboardService.getLeaderboard(String(mode), String(region), parseInt(limit, 10), parseInt(page, 10), sort === "asc" ? "asc" : "desc");
            res
                .status(httpStatus_1.HttpStatus?.OK)
                .json({
                success: true,
                message: httpResponse_1.HttpResponse?.RESOURCE_FOUND,
                leaderboard,
                pagination,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async createPlayer(req, res, next) {
        try {
            const { name, score, region, mode } = req.body;
            const data = await this.leaderboardService.createPlayer(name, score, region, mode);
            res
                .status(httpStatus_1.HttpStatus?.CREATED)
                .json({ success: true, message: httpResponse_1.HttpResponse?.CREATED, data });
        }
        catch (error) {
            next(error);
        }
    }
    async updatePlayer(req, res, next) {
        try {
            const { id, score } = req.body;
            const data = await this.leaderboardService.updatePlayer(id, score);
            res
                .status(httpStatus_1.HttpStatus?.OK)
                .json({ success: true, message: httpResponse_1.HttpResponse?.UPDATE_SUCCESS, data });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.LeaderboardController = LeaderboardController;
