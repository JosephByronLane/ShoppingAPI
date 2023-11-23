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
exports.needlogin = void 0;
require("reflect-metadata");
const app_1 = __importDefault(require("./app"));
const db_1 = require("./db");
const admin_seed_1 = require("./admin-seed");
const add_products_1 = require("./add-products");
exports.needlogin = true;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_1.AppDataSource.initialize();
            console.log("Database connected");
            console.log('-----------------------------------');
            console.log('Creating admin user');
            console.log('-----------------------------------');
            yield (0, admin_seed_1.createAdminUser)();
            console.log('-----------------------------------');
            console.log('Seeding products');
            console.log('-----------------------------------');
            yield (0, add_products_1.seedProducts)();
            console.log('-----------------------------------');
            console.log('Seeding products on promotion');
            console.log('-----------------------------------');
            yield (0, add_products_1.seedPromotionalProducts)();
            app_1.default.listen(3000);
            console.log('-----------------------------------');
            console.log('Server is listening on port 3000');
            console.log('-----------------------------------');
        }
        catch (error) {
            console.error(error);
        }
    });
}
main();
