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
exports.getAuthToken = getAuthToken;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let token = null;
function getAuthToken() {
    return __awaiter(this, void 0, void 0, function* () {
        if (token)
            return token;
        const { EMAIL, NAME, ROLL_NO, ACCESS_CODE, CLIENT_ID, CLIENT_SECRET, } = process.env;
        const response = yield axios_1.default.post("http://20.244.56.144/evaluation-service/auth", {
            email: EMAIL,
            name: NAME,
            rollNo: ROLL_NO,
            accessCode: ACCESS_CODE,
            clientID: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
        });
        token = response.data.access_token;
        return token;
    });
}
