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
exports.findUserByUsername = exports.getUserByUsername = exports.getUser = exports.deleteUser = exports.updateUser = exports.getUsers = exports.createUser = void 0;
const Usuario_1 = require("../models/Usuario");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const usuario = new Usuario_1.Usuario();
        usuario.nombre = name;
        yield usuario.save();
        return res.json(usuario);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.createUser = createUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield Usuario_1.Usuario.find();
        return res.json(users);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.getUsers = getUsers;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield Usuario_1.Usuario.findOneBy({ id: parseInt(req.params.id) });
    console.log(user);
    if (!user)
        return res.status(404).json({ message: 'User does not exist' });
    yield Usuario_1.Usuario.update({ id: parseInt(id) }, req.body);
    return res.sendStatus(204);
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield Usuario_1.Usuario.delete({ id: parseInt(id) });
        if (result.affected === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.deleteUser = deleteUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //MISSING ERROR HANDLING, IM LAZY SRY
        const user = yield Usuario_1.Usuario.findOneBy({ id: parseInt(req.params.id) });
        return res.json(user);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getUser = getUser;
const getUserByUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, exports.findUserByUsername)(req.params.usuario);
        if (user) {
            return res.json(user);
        }
        else {
            return res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getUserByUsername = getUserByUsername;
const findUserByUsername = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield Usuario_1.Usuario.findOneBy({ nombre });
        return user || null;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.findUserByUsername = findUserByUsername;
