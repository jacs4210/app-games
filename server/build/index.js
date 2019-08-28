"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*  Se importan el modulo 'express' y el tipo de dato 'Application'.
    express: Permite crear el servidor con una configuración base.
    Application: Tipo de dato para asignar a una variable al ejecutar el método express()
 */
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
// Se importan las rutas configuradas
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const gamesRoutes_1 = __importDefault(require("./routes/gamesRoutes"));
// Clase Server y principal que contiene la configuración personalizada del servidor.
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    // Configuración personalizada del servidor
    config() {
        // Se configura el puerto por defecto que escuchará el servidor.
        this.app.set('port', process.env.PORT || 3000);
        // Permite visualizar en consola las peticiones realizadas desde un cliente al servidor.
        this.app.use(morgan_1.default('dev'));
        // Permite aceptar peticiones desde una aplicación web o movil.
        this.app.use(cors_1.default());
        // Permite recibir desde una petición cliente, objetos JSON.
        this.app.use(express_1.default.json());
        // Permite recibir formularios HTTP.
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    /*  Configuración de las rutas o servicios que procesará el servidor al momento
        que le realicen una petición.
    */
    routes() {
        // Indica las rutas que se van a matricularse en el servidor y que podrá atender.
        this.app.use(indexRoutes_1.default);
        this.app.use('/api/games', gamesRoutes_1.default);
    }
    // Método que inicia el servidor mediante el método 'listen'
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server in the port ' + this.app.get('port'));
        });
    }
}
// Constante que recibe la instancia del servidor.
const server = new Server();
// Se inicia el servidor.
server.start();
