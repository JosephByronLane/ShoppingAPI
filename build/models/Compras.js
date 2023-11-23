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
exports.Compras = void 0;
const typeorm_1 = require("typeorm");
const Usuario_1 = require("./Usuario");
const DetalladoCompras_1 = require("./DetalladoCompras");
let Compras = class Compras extends typeorm_1.BaseEntity {
};
exports.Compras = Compras;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Compras.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Compras.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Compras.prototype, "nombre_del_cliente", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Compras.prototype, "precio_total", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Compras.prototype, "total_de_productos", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Compras.prototype, "fecha_de_creacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Compras.prototype, "usuario_de_creacion", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Compras.prototype, "fecha_de_actualizacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Compras.prototype, "usuario_de_actualizacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', nullable: true, default: true }),
    __metadata("design:type", Boolean)
], Compras.prototype, "activo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: false, default: "Activo" }),
    __metadata("design:type", String)
], Compras.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Usuario_1.Usuario, usuario => usuario.compras),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Usuario_1.Usuario)
], Compras.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => DetalladoCompras_1.DetalladoCompras, detalladoCompras => detalladoCompras.compra),
    __metadata("design:type", Array)
], Compras.prototype, "detalladoCompras", void 0);
exports.Compras = Compras = __decorate([
    (0, typeorm_1.Entity)('compras')
], Compras);
