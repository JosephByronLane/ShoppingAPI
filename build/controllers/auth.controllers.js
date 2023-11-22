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
exports.tryLogin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuario_controllers_1 = require("../controllers/usuario.controllers");
const jwt = require('jsonwebtoken');
const tryLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, contrasenia } = req.body;
        const user = yield (0, usuario_controllers_1.findUserByUsername)(nombre);
        if (!user) {
            return res.status(401).json({ message: 'Wrong Username' });
        }
        const isMatch = yield bcrypt_1.default.compare(contrasenia, user.contrasenia);
        if (!isMatch) {
            return res.status(401).json({ message: 'Wrong password' });
        }
        const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.tryLogin = tryLogin;
