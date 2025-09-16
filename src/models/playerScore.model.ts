import { Schema, model, Document, Types } from "mongoose";
import { HttpStatus } from "../constants";
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

const playerScoreSchema = new Schema<IplayerScore>({
    id:{type:Types.ObjectId},
    name: { type: String, required: true },
    mode: { type: String, index: true ,default:"Arena"},
    region: { type: String, default:"ASIA", index: true },
    score: { type: Number, required: true, default: 0 },
    expireAt: { type: Date, default: null },
}
,{
    timestamps:true
});
//unique compound index
playerScoreSchema.index({ name: 1, mode: 1, region: 1 }, { unique: true });
//for the frequent fetching data
playerScoreSchema.index({ mode: 1, region: 1, score: -1 });

//ttl
playerScoreSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

export const playerScoreModel = model<IplayerScore>('playerScore', playerScoreSchema);