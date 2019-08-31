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
            /* Declaración de variable que obtiene el valor de la propiedad de acuerdo al nombre definido de la variable.
                por ejemplo, si en la petición hay query parameters o en el cuerpo hay una propiedad llamada id, esta
                variable obtendrá ese valor con tan solo nombrarla como está definido en la petición y encerrada entre llaves
            */
            const { id } = req.params;
            const games = yield database_1.default.query('SELECT * FROM games WHERE id = ?', [id]);
            if (games.length > 0) {
                res.json(games[0]);
            }
            else {
                res.status(404).json({ message: "Game doesn't exists" });
            }
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
    /*  El cuerpo de la petición, mediante el objeto de la conexión de la base de datos, se
        puede encargar de serializar los datos que se desean actualizar de la tabla. */
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE games SET ? WHERE id = ?', [req.body, id]);
            res.json({ message: 'Game ' + req.params.id + ' updated' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM games WHERE id = ?', [id]);
            res.json({ message: 'Game ' + id + ' deleted' });
        });
    }
}
const gamesController = new GamesController();
exports.default = gamesController;
