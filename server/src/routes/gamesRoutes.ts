/*  El modulo 'Router' de express permite utilizar Path o URL para direccionar o mostrar información
    por parte del servidor.
*/
import { Router } from 'express';
import gamesController from '../controllers/gamesController';

// Clase de rutas base.
class GamesRouter {

    // Variable que recibe el objeto router.
    public router: Router = Router();

    constructor() {
        this.config();
    }

    // Configuración de las rutas que puede utilizar o se exportarán para ser usadas por el servidor.
    config() {
        this.router.get('/', gamesController.list);
        this.router.get('/:id', gamesController.getOne);
        this.router.post('/', gamesController.create);
        this.router.put('/:id', gamesController.update);
        this.router.delete('/:id', gamesController.delete);
    }
}

const gamesRoutes = new GamesRouter();

// Se exportan las rutas para poder ser utilizadas por el servidor u otra clase.
export default gamesRoutes.router;