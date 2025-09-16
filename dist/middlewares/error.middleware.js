"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const http_error_util_1 = require("../utils/http.error.util");
const httpStatus_1 = require("../constants/httpStatus");
const httpResponse_1 = require("../constants/httpResponse");
const errorHandler = (err, _req, res, _next) => {
    let statusCode = httpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR;
    let message = httpResponse_1.HttpResponse.SERVER_ERROR;
    console.log("Error Midlewrwe Error:", err);
    if (err instanceof http_error_util_1.HttpError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    else {
        console.log("Unhandled", err);
    }
    res.status(statusCode).json({ error: message });
};
exports.errorHandler = errorHandler;
