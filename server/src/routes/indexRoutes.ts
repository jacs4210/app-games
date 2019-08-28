/*  El modulo 'Router' de express permite utilizar Path o URL para direccionar o mostrar información
    por parte del servidor.
*/
import { Router } from 'express';
import indexController from '../controllers/indexController';

// Clase de rutas base.
class IndexRouter {

    // Variable que recibe el objeto router.
    public router: Router = Router();

    constructor() {
        this.config();
    }

    // Configuración de las rutas que puede utilizar o se exportarán para ser usadas por el servidor.
    config() {
        this.router.get('/', indexController.index);
    }
}

const indexRouter = new IndexRouter();

// Se exportan las rutas para poder ser utilizadas por el servidor u otra clase.
export default indexRouter.router;