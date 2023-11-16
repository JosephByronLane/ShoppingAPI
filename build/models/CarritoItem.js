"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarritoItem = void 0;
const typeorm_1 = require("typeorm");
const Productos_1 = require("./Productos");
const Usuario_1 = require("./Usuario");
let CarritoItem = class CarritoItem extends typeorm_1.BaseEntity {
};
exports.CarritoItem = CarritoItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CarritoItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Productos_1.Productos, producto => producto.carritoItems),
    __metadata("design:type", Productos_1.Productos)
], CarritoItem.prototype, "producto", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CarritoItem.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Usuario_1.Usuario, usuario => usuario.carrito),
    __metadata("design:type", Usuario_1.Usuario)
], CarritoItem.prototype, "usuario", void 0);
exports.CarritoItem = CarritoItem = __decorate([
    (0, typeorm_1.Entity)('carrito')
], CarritoItem);
//@OneToOne(()=> Carrito, carrito => carrito.usuario)
