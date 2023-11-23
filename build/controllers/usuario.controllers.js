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
exports.findUserByUsername = exports.getUser = exports.deleteUser = exports.updateUser = exports.getUsers = exports.createUser = void 0;
const Usuario_1 = require("../models/Usuario");
const bcrypt_1 = __importDefault(require("bcrypt"));
const validation_controller_1 = require("./validation.controller");
const Joi = require('joi');
const usuariosSchema = Joi.object({
    nombre: Joi.string(),
    correo_electronico: Joi.string()
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, correo_electronico, contrasenia } = req.body;
        const usuario = new Usuario_1.Usuario();
        const id = req.id;
        const nombreUsuario = req.nombre;
        const errors = yield (0, validation_controller_1.validateEntity)(usuario, req.body);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        if (typeof nombreUsuario !== 'string') {
            return res.status(401).json({ message: 'User name is undefined' });
        }
        if (typeof req.nombre !== 'string') {
            return res.status(400).json({ message: 'Error retrieving Username from token. Try logging in again.' });
        }
        const contraseniaHasheada = yield bcrypt_1.default.hash(contrasenia, 10);
        usuario.nombre = nombre;
        usuario.correo_electronico = correo_electronico;
        usuario.contrasenia = contraseniaHasheada;
        usuario.usuario_de_creacion = req.nombre;
        yield setParameterFields(usuario, nombreUsuario, true);
        yield usuario.save();
        res.status(200).json({
            status: "Success",
            message: "Succesfully created User",
            data: {
                "id": usuario.id,
                "nombre": usuario.nombre,
                "correo_electronico": usuario.correo_electronico,
            }
        });
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.createUser = createUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = usuariosSchema.validate(req.query);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const filtro = value;
        const users = yield Usuario_1.Usuario.find({
            where: Object.assign(Object.assign({}, filtro), { activo: 1 }),
            select: ['id', 'nombre', 'correo_electronico'],
        });
        return res.status(200).json({
            status: "Success",
            message: "Retrieved all users.",
            data: {
                users
            }
        });
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.getUsers = getUsers;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = req.body;
    const allowedUpdateFields = ['nombre', 'correo_electronico', 'contrasenia'];
    if ((0, validation_controller_1.hasUnallowedFields)(updateData, allowedUpdateFields)) {
        return res.status(400).json({ message: 'Request contains unallowed fields' });
    }
    if (updateData.hasOwnProperty('password')) {
        const hashedPassword = yield bcrypt_1.default.hash(updateData.password, 10);
        updateData.password = hashedPassword;
    }
    const user = yield Usuario_1.Usuario.findOneBy({ id: parseInt(req.params.id) });
    if (!user)
        return res.status(404).json({ message: 'User does not exist' });
    yield Usuario_1.Usuario.update({ id: parseInt(id) }, req.body);
    return res.status(200).json({
        status: "Success",
        message: "Succesfully changed user data",
        data: {
            id: user.id,
            nombre: user.nombre,
            correo_electronico: user.correo_electronico
        }
    });
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({ message: `Error recieving User ID.` });
        }
        console.log('-----------------------------------');
        console.log(`Found ID: ${id} to delete.`);
        console.log('-----------------------------------');
        let user = yield Usuario_1.Usuario.findOne({
            where: {
                id: parseInt(id),
                activo: 1
            }
        });
        console.log('-----------------------------------');
        console.log(`Succesfully attempted to find the User.`);
        console.log('-----------------------------------');
        if (!user) {
            console.log('-----------------------------------');
            console.log(`User with id ${id} was not found.`);
            console.log('-----------------------------------');
            return res.status(404).json({ message: `User with id: ${id} not found.` });
        }
        user.activo = 0;
        console.log('-----------------------------------');
        console.log(`Users with id ${id} active succesfully set to 0.`);
        console.log('-----------------------------------');
        Usuario_1.Usuario.save(user);
        res.status(200).json({
            status: "Success",
            message: "Succesfully deleted.",
        });
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.deleteUser = deleteUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({ message: `Error recieving User ID.` });
        }
        console.log('-----------------------------------');
        console.log(`Found ID: ${id} to show.`);
        console.log('-----------------------------------');
        let user = yield Usuario_1.Usuario.findOne({
            where: {
                id: parseInt(id),
                activo: 1
            },
            select: ['id', 'nombre', 'correo_electronico'],
        });
        console.log('-----------------------------------');
        console.log(`Succesfully attempted to find the User.`);
        console.log('-----------------------------------');
        if (!user) {
            console.log('-----------------------------------');
            console.log(`User with id ${id} was not found.`);
            console.log('-----------------------------------');
            return res.status(404).json({ message: `User with id: ${id} not found.` });
        }
        console.log('-----------------------------------');
        console.log(`Users with id ${id} active was succesfully found..`);
        console.log('-----------------------------------');
        return res.status(200).json({
            status: "Success",
            message: "Succesfully found user.",
            data: user
        });
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: error.message });
    }
});
exports.getUser = getUser;
const findUserByUsername = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(nombre);
        console.log(typeof nombre);
        const user = yield Usuario_1.Usuario.findOneBy({ nombre });
        if (!user) {
            console.log("USER IS NULL");
        }
        return user || null;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.findUserByUsername = findUserByUsername;
function setParameterFields(entity, nombresIuario, isNew = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const userField = isNew ? 'usuario_de_creacion' : 'usuario_de_actualizacion';
        entity[userField] = nombresIuario;
        yield entity.save();
        return entity;
    });
}
