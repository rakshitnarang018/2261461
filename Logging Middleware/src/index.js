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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = Log;
const api_1 = require("./api");
const constants_1 = require("./constants");
/**
 * Sends a log to the Affordmed logging service.
 * Validates stack, level, and package before sending.
 */
function Log(stack, level, pkg, message) {
    return __awaiter(this, void 0, void 0, function* () {
        const isValidStack = constants_1.VALID_STACKS.includes(stack);
        const isValidLevel = constants_1.VALID_LEVELS.includes(level);
        const isValidPackage = (stack === "backend" && constants_1.BACKEND_PACKAGES.includes(pkg)) ||
            (stack === "frontend" && constants_1.FRONTEND_PACKAGES.includes(pkg)) ||
            constants_1.SHARED_PACKAGES.includes(pkg);
        if (!isValidStack || !isValidLevel || !isValidPackage) {
            console.error(`[Logger Error] Invalid parameters -> stack: ${stack}, level: ${level}, package: ${pkg}`);
            return;
        }
        const payload = {
            stack,
            level,
            package: pkg,
            message,
        };
        yield (0, api_1.sendLog)(payload);
    });
}
