"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardRepository = void 0;
const playerScore_model_1 = require("../../models/playerScore.model");
class LeaderboardRepository {
    constructor() { }
    async createPlayer(name, score, region, mode, date) {
        const obj = new playerScore_model_1.playerScoreModel({
            name,
            score,
            region,
            mode,
            expireAt: date,
        });
        await obj.save();
        return obj.toObject();
    }
    async findByName(name) {
        return await playerScore_model_1.playerScoreModel.findOne({ name });
    }
    async updateScore(id, score) {
        return await playerScore_model_1.playerScoreModel.findByIdAndUpdate({ _id: id }, { $set: { score } }, { new: true }).exec();
    }
    async topTen(mode = "", region = "", limit = 10, page = 1, sort = "desc") {
        const query = {};
        if (mode)
            query.mode = mode;
        if (region)
            query.region = region;
        const sortOrder = sort === "asc" ? 1 : -1;
        return await playerScore_model_1.playerScoreModel
            .find(query)
            .sort({ score: sortOrder })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
    }
    async countDocs(mode, region) {
        return await playerScore_model_1.playerScoreModel.countDocuments({ mode, region });
    }
}
exports.LeaderboardRepository = LeaderboardRepository;
