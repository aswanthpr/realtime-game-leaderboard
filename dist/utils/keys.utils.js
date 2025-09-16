"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerHashKey = exports.leaderboardKey = exports.getDate = void 0;
const getDate = (d = new Date()) => {
    const yyyy = d.getUTCFullYear();
    const mm = String(d.getUTCMonth()).padStart(2, "0");
    const dd = String(d.getUTCDay()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
};
exports.getDate = getDate;
const leaderboardKey = (date, region, game) => {
    return `leaderboard:${date}:${region}:${game}`;
};
exports.leaderboardKey = leaderboardKey;
const playerHashKey = (playerId) => `player:${playerId}`;
exports.playerHashKey = playerHashKey;
