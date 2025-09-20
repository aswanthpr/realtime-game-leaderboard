
import {HttpError} from "../utils/http.error.util";
import {HttpResponse,HttpStatus} from "../constants";
import type { NextFunction,Request,Response } from "express";

export const errorHandler = (
    err: HttpError | Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string = HttpResponse.SERVER_ERROR;

    console.log("Error Midlewrwe Error:", err);

    if (err instanceof HttpError) {
        statusCode = err.statusCode;
        message = err.message;
    } else {
        console.log("Unhandled", err);
    }

    res.status(statusCode).json({error: message});
};

export function notFoundHandler(req: Request, _res: Response, next: NextFunction) {
  const error = new HttpError(HttpStatus?.NOT_FOUND,
    `🔎 The route [${req.method}] ${req.originalUrl} was not found on this server.`,
    
  );
  next(error); 
}

