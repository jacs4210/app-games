"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*  El modulo 'Router' de express permite utilizar Path o URL para direccionar o mostrar información
    por parte del servidor.
*/
const express_1 = require("express");
const indexController_1 = __importDefault(require("../controllers/indexController"));
// Clase de rutas base.
class IndexRouter {
    constructor() {
        // Variable que recibe el objeto router.
        this.router = express_1.Router();
        this.config();
    }
    // Configuración de las rutas que puede utilizar o se exportarán para ser usadas por el servidor.
    config() {
        this.router.get('/', indexController_1.default.index);
    }
}
const indexRouter = new IndexRouter();
// Se exportan las rutas para poder ser utilizadas por el servidor u otra clase.
exports.default = indexRouter.router;
