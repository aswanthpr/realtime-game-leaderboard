import { Document } from "mongoose";
import { HttpStatus } from "../constants/httpStatus";
import { GameMode, Region } from "../types/types";
export interface IplayerScore extends Document {
    status(CREATED: HttpStatus): unknown;
    name: string;
    region: Region;
    mode: GameMode;
    score: number;
    updatedAt: Date;
    createdAt: Date;
    expireAt: Date;
}
export declare const playerScoreModel: import("mongoose").Model<IplayerScore, {}, {}, {}, Document<unknown, {}, IplayerScore, {}, {}> & IplayerScore & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=playerScore.model.d.ts.map