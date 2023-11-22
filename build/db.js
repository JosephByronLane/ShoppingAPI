"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Usuario_1 = require("./models/Usuario");
const Compras_1 = require("./models/Compras");
const DetalladoCompras_1 = require("./models/DetalladoCompras");
const Productos_1 = require("./models/Productos");
const ProductosEnPromocion_1 = require("./models/ProductosEnPromocion");
const TipoPromocion_1 = require("./models/TipoPromocion");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'letmeinplease',
    database: 'api_equipo2',
    port: 3306,
    entities: [Usuario_1.Usuario, Compras_1.Compras, DetalladoCompras_1.DetalladoCompras, Productos_1.Productos, ProductosEnPromocion_1.ProductosEnPromocion, TipoPromocion_1.TipoPromocion /**/],
    logging: true,
    synchronize: false
});
