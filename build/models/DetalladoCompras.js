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
exports.DetalladoCompras = void 0;
const typeorm_1 = require("typeorm");
const Compras_1 = require("./Compras");
const Productos_1 = require("./Productos");
let DetalladoCompras = class DetalladoCompras extends typeorm_1.BaseEntity {
};
exports.DetalladoCompras = DetalladoCompras;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DetalladoCompras.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], DetalladoCompras.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], DetalladoCompras.prototype, "fecha_de_creacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], DetalladoCompras.prototype, "usuario_de_creacion", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], DetalladoCompras.prototype, "fecha_de_actualizacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], DetalladoCompras.prototype, "usuario_de_actualizacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', nullable: true }),
    __metadata("design:type", Number)
], DetalladoCompras.prototype, "activo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Compras_1.Compras, compra => compra.id),
    __metadata("design:type", Compras_1.Compras)
], DetalladoCompras.prototype, "compra", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Productos_1.Productos, producto => producto.id),
    __metadata("design:type", Productos_1.Productos)
], DetalladoCompras.prototype, "producto", void 0);
exports.DetalladoCompras = DetalladoCompras = __decorate([
    (0, typeorm_1.Entity)('detallado_compras')
], DetalladoCompras);
