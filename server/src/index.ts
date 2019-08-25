/*  Se importan el modulo 'express' y el tipo de dato 'Application'.
    express: Permite crear el servidor con una configuración base.
    Application: Tipo de dato para asignar a una variable al ejecutar el método express()
 */
import express, { Application } from 'express';

// Se importan las rutas configuradas
import indexRoutes from './routes/indexRoutes';

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
    }

    /*  Configuración de las rutas o servicios que procesará el servidor al momento
        que le realicen una petición.
    */
    routes(): void {
        // Indica las rutas que se van a matricularse en el servidor y que podrá atender.
        this.app.use(indexRoutes);
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