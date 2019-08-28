"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*  El modulo 'Router' de express permite utilizar Path o URL para direccionar o mostrar información
    por parte del servidor.
*/
const express_1 = require("express");
const gamesController_1 = __importDefault(require("../controllers/gamesController"));
// Clase de rutas base.
class GamesRouter {
    constructor() {
        // Variable que recibe el objeto router.
        this.router = express_1.Router();
        this.config();
    }
    // Configuración de las rutas que puede utilizar o se exportarán para ser usadas por el servidor.
    config() {
        this.router.get('/', gamesController_1.default.list);
        this.router.get('/:id', gamesController_1.default.getOne);
        this.router.post('/', gamesController_1.default.create);
        this.router.put('/:id', gamesController_1.default.update);
        this.router.delete('/:id', gamesController_1.default.delete);
    }
}
const gamesRoutes = new GamesRouter();
// Se exportan las rutas para poder ser utilizadas por el servidor u otra clase.
exports.default = gamesRoutes.router;
