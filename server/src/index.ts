/*  Se importan el modulo 'express' y el tipo de dato 'Application'.
    express: Permite crear el servidor con una configuración base.
    Application: Tipo de dato para asignar a una variable al ejecutar el método express()
 */
import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

// Se importan las rutas configuradas
import indexRoutes from './routes/indexRoutes';
import gamesRoutes from './routes/gamesRoutes';

// Clase Server y principal que contiene la configuración personalizada del servidor.
class Server {

    // Variable que recibe el objeto servidor express.
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    // Configuración personalizada del servidor
    config(): void {
        // Se configura el puerto por defecto que escuchará el servidor.
        this.app.set('port', process.env.PORT || 3000);
        // Permite visualizar en consola las peticiones realizadas desde un cliente al servidor.
        this.app.use(morgan('dev'));
        // Permite aceptar peticiones desde una aplicación web o movil.
        this.app.use(cors());
        // Permite recibir desde una petición cliente, objetos JSON.
        this.app.use(express.json());
        // Permite recibir formularios HTTP.
        this.app.use(express.urlencoded({ extended: false }));
    }

    /*  Configuración de las rutas o servicios que procesará el servidor al momento
        que le realicen una petición.
    */
    routes(): void {
        // Indica las rutas que se van a matricularse en el servidor y que podrá atender.
        this.app.use(indexRoutes);
        this.app.use('/api/games', gamesRoutes);
    }

    // Método que inicia el servidor mediante el método 'listen'
    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server in the port ' + this.app.get('port'));
        });
    }
}

// Constante que recibe la instancia del servidor.
const server = new Server();

// Se inicia el servidor.
server.start();