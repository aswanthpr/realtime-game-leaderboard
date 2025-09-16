"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResponse = void 0;
var HttpResponse;
(function (HttpResponse) {
    HttpResponse["SERVER_ERROR"] = "Internal server error";
    HttpResponse["FIELDS_REQUIRED"] = "All fields are required";
    HttpResponse["CREATED"] = "Source created";
    HttpResponse["ACTION_FAILED"] = "Action failed";
    HttpResponse["PAGE_NOT_FOUND"] = "Route not found";
    HttpResponse["OPERATION_FAILED"] = "Operation failed";
    HttpResponse["PLAYER_EXIST"] = "Player alredy exist";
    HttpResponse["FAILED_TO_UPDATE"] = "Failed to update";
    HttpResponse["UPDATE_SUCCESS"] = "Update successfully";
    HttpResponse["FAIELD_FETCH"] = "Failed to fetch";
    HttpResponse["RESOURCE_FOUND"] = "Resource found";
})(HttpResponse || (exports.HttpResponse = HttpResponse = {}));
;
