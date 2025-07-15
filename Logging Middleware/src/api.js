"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendLog = sendLog;
const axios_1 = __importDefault(require("axios"));
const auth_1 = require("./auth");
function sendLog(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = yield (0, auth_1.getAuthToken)();
            const response = yield axios_1.default.post("http://20.244.56.144/evaluation-service/logs", payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Optional: log server response to console (remove in production)
            // console.log("Log submitted:", response.data);
        }
        catch (error) {
            console.error("Failed to send log:", error);
        }
    });
}
