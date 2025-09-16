"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerScoreModel = void 0;
const mongoose_1 = require("mongoose");
const playerScoreSchema = new mongoose_1.Schema({
    id: { type: mongoose_1.Types.ObjectId },
    name: { type: String, required: true },
    mode: { type: String, index: true, default: "Arena" },
    region: { type: String, default: "ASIA", index: true },
    score: { type: Number, required: true, default: 0 },
    expireAt: { type: Date, default: null },
}, {
    timestamps: true
});
//unique compound index
playerScoreSchema.index({ name: 1, mode: 1, region: 1 }, { unique: true });
//for the frequent fetching data
playerScoreSchema.index({ mode: 1, region: 1, score: -1 });
//ttl
playerScoreSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
exports.playerScoreModel = (0, mongoose_1.model)('playerScore', playerScoreSchema);
