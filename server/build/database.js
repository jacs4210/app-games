"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_mysql_1 = __importDefault(require("promise-mysql"));
const keys_1 = __importDefault(require("./keys"));
/*
Crea un pool de conexiones que permite basicamente tener un conjunto de conexiones para
ser usadas por el proceso que la necesite, siempre permanecen abiertas y se puede definir
un limite para la cantidad de sesiones a tener en el pool.
*/
const pool = promise_mysql_1.default.createPool(keys_1.default.database);
// Obtiene una conexión disponible del pool, una vez la establece, se retorna el objeto.
pool.getConnection()
    .then(connection => {
    pool.releaseConnection(connection);
    console.log('DB is connected');
});
exports.default = pool;
