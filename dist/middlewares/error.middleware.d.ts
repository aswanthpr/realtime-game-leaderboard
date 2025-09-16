import { HttpError } from "../utils/http.error.util";
import type { NextFunction, Request, Response } from "express";
export declare const errorHandler: (err: HttpError | Error, _req: Request, res: Response, _next: NextFunction) => void;
//# sourceMappingURL=error.middleware.d.ts.map