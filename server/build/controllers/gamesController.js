"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class GamesController {
    /* Al ejecutar la consulta, el retorno es un arreglo de JSON serializada para ser entendible por
     el servidor y tratar dicha información de acuerdo a la necesidad. */
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Mediante el uso de async-await es posible asignar el retorno de una consulta a una variable/constante.
            const games = yield database_1.default.query('SELECT * FROM games');
            res.json(games);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const game = yield database_1.default.query('SELECT * FROM games WHERE id = ?', [req.params.id]);
            res.json(game);
        });
    }
    /***
        Se crea 1 juego mediante los parámetros recibidos en el cuerpo de la petición.
        Se utiliza el manejo de promesas con Async-Await y una vez termine de ejecutarse
        la sentencia, se responderá un mensaje a la petición.

        Es un método que maneja promesas pero que esas promesas no retornan nada.
    */
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO games SET ?', [req.body]);
            res.json({ message: 'Game saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('UPDATE games SET image = ? WHERE id = ?', [req.body, req.params.id]);
            res.json({ message: 'Game ' + req.params.id + ' updated' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('DELETE FROM games WHERE id = ?', [req.params.id]);
            res.json({ message: 'Game ' + req.params.id + ' deleted' });
        });
    }
}
const gamesController = new GamesController();
exports.default = gamesController;
