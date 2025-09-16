"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leaderboard_controller_1 = require("../controllers/leaderboard.controller");
const leaderboard_service_1 = require("../service/implementation/leaderboard.service");
const leaderboard_repository_1 = require("../repository/implementation/leaderboard.repository");
const router = (0, express_1.Router)();
const leaderboardRepo = new leaderboard_repository_1.LeaderboardRepository();
const leaderService = new leaderboard_service_1.LeaderboardService(leaderboardRepo);
const leaderController = new leaderboard_controller_1.LeaderboardController(leaderService);
router
    .get("/", leaderController?.getLeaderboard.bind(leaderController))
    .post("/player", leaderController.createPlayer.bind(leaderController))
    .patch("/player", leaderController.updatePlayer.bind(leaderController));
exports.default = router;
