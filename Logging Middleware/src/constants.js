"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SHARED_PACKAGES = exports.FRONTEND_PACKAGES = exports.BACKEND_PACKAGES = exports.VALID_LEVELS = exports.VALID_STACKS = void 0;
exports.VALID_STACKS = ["backend", "frontend"];
exports.VALID_LEVELS = ["debug", "info", "warn", "error", "fatal"];
exports.BACKEND_PACKAGES = [
    "cache", "controller", "cron_job", "db", "domain", "handler",
    "repository", "route", "service"
];
exports.FRONTEND_PACKAGES = [
    "api", "component", "hook", "page", "state", "style"
];
exports.SHARED_PACKAGES = [
    "auth", "config", "middleware", "utils"
];
