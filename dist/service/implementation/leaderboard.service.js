"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardService = void 0;
const httpResponse_1 = require("../../constants/httpResponse");
const http_error_util_1 = require("../../utils/http.error.util");
const date_fns_1 = require("date-fns");
const httpStatus_1 = require("../../constants/httpStatus");
const socket_1 = require("../../socket");
class LeaderboardService {
    constructor(repo) {
        this.repo = repo;
    }
    ;
    async createPlayer(name, score, region, mode) {
        if (!name || !score || !region || !mode) {
            throw (0, http_error_util_1.createHttpError)(httpStatus_1.HttpStatus?.BAD_REQUEST, httpResponse_1.HttpResponse?.FIELDS_REQUIRED);
        }
        const checkUser = await this.repo.findByName(name);
        if (checkUser) {
            throw (0, http_error_util_1.createHttpError)(httpStatus_1.HttpStatus?.BAD_REQUEST, httpResponse_1.HttpResponse?.PLAYER_EXIST);
        }
        const now = new Date();
        const tomorrowMidNight = (0, date_fns_1.addDays)((0, date_fns_1.startOfDay)(now), 1);
        const result = await this.repo.createPlayer(name, score, region, mode, tomorrowMidNight);
        if (!result) {
            throw (0, http_error_util_1.createHttpError)(httpStatus_1.HttpStatus?.NOT_FOUND, httpResponse_1.HttpResponse?.OPERATION_FAILED);
        }
        const topPlayers = await this.repo.topTen();
        if (!topPlayers) {
            throw (0, http_error_util_1.createHttpError)(httpStatus_1.HttpStatus?.NOT_FOUND, httpResponse_1.HttpResponse?.FAIELD_FETCH);
        }
        (0, socket_1.getIO)().emit("leaderboard:update", { leaderboard: topPlayers });
        return topPlayers;
    }
    async updatePlayer(id, score) {
        if (!id || !score) {
            throw (0, http_error_util_1.createHttpError)(httpStatus_1.HttpStatus?.BAD_REQUEST, httpResponse_1.HttpResponse?.FIELDS_REQUIRED);
        }
        const checkUser = await this.repo.updateScore(id, score);
        if (!checkUser) {
            throw (0, http_error_util_1.createHttpError)(httpStatus_1.HttpStatus?.BAD_REQUEST, httpResponse_1.HttpResponse?.FAILED_TO_UPDATE);
        }
        const topPlayers = await this.repo.topTen();
        if (!topPlayers) {
            throw (0, http_error_util_1.createHttpError)(httpStatus_1.HttpStatus?.NOT_FOUND, httpResponse_1.HttpResponse?.FAIELD_FETCH);
        }
        (0, socket_1.getIO)().emit("leaderboard:update", { leaderboard: topPlayers });
        return topPlayers;
    }
    async getLeaderboard(mode, region, limit, page, sort) {
        const leaderboard = await this.repo.topTen(mode, region, limit, page, sort);
        const total = await this.repo.countDocs(mode, region);
        const pagination = {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        };
        (0, socket_1.getIO)().emit("leaderboard:fetch", { leaderboard, pagination });
        return {
            leaderboard,
            pagination
        };
    }
}
exports.LeaderboardService = LeaderboardService;
