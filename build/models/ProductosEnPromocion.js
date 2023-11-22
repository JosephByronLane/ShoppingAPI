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
exports.ProductosEnPromocion = void 0;
const typeorm_1 = require("typeorm");
const Productos_1 = require("./Productos");
let ProductosEnPromocion = class ProductosEnPromocion extends typeorm_1.BaseEntity {
};
exports.ProductosEnPromocion = ProductosEnPromocion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProductosEnPromocion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], ProductosEnPromocion.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ProductosEnPromocion.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], ProductosEnPromocion.prototype, "precio_en_promocion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], ProductosEnPromocion.prototype, "fecha_de_inicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], ProductosEnPromocion.prototype, "fecha_de_finalizacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', nullable: true }),
    __metadata("design:type", Number)
], ProductosEnPromocion.prototype, "activo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], ProductosEnPromocion.prototype, "extra1", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], ProductosEnPromocion.prototype, "extra2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Productos_1.Productos),
    (0, typeorm_1.JoinColumn)({ name: 'producto_id' }),
    __metadata("design:type", Productos_1.Productos)
], ProductosEnPromocion.prototype, "producto", void 0);
exports.ProductosEnPromocion = ProductosEnPromocion = __decorate([
    (0, typeorm_1.Entity)('productosenpromocion')
], ProductosEnPromocion);
