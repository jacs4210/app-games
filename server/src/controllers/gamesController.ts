import { Request, Response } from 'express';

import pool from '../database';

class GamesController {

    /* Al ejecutar la consulta, el retorno es un arreglo de JSON serializada para ser entendible por
     el servidor y tratar dicha información de acuerdo a la necesidad. */
    public async list(req: Request, res: Response): Promise<void> {
        // Mediante el uso de async-await es posible asignar el retorno de una consulta a una variable/constante.
        const games = await pool.query('SELECT * FROM games');
        res.json(games);
    }

    public async getOne(req: Request, res: Response): Promise<void> {
        /* Declaración de variable que obtiene el valor de la propiedad de acuerdo al nombre definido de la variable.
            por ejemplo, si en la petición hay query parameters o en el cuerpo hay una propiedad llamada id, esta
            variable obtendrá ese valor con tan solo nombrarla como está definido en la petición y encerrada entre llaves
        */
        const { id } = req.params;
        const games = await pool.query('SELECT * FROM games WHERE id = ?', [id]);
        if (games.length > 0) {
            res.json(games[0]);
        } else {
            res.status(404).json({ message: "Game doesn't exists" });
        }
    }

    /***
        Se crea 1 juego mediante los parámetros recibidos en el cuerpo de la petición.
        Se utiliza el manejo de promesas con Async-Await y una vez termine de ejecutarse
        la sentencia, se responderá un mensaje a la petición.

        Es un método que maneja promesas pero que esas promesas no retornan nada.
    */
    public async create(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO games SET ?', [req.body]);
        res.json({ message: 'Game saved' });
    }

    /*  El cuerpo de la petición, mediante el objeto de la conexión de la base de datos, se
        puede encargar de serializar los datos que se desean actualizar de la tabla. */
    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('UPDATE games SET ? WHERE id = ?', [req.body, id]);
        res.json({ message: 'Game ' + req.params.id + ' updated' });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM games WHERE id = ?', [id]);
        res.json({ message: 'Game ' + id + ' deleted' });
    }
}

const gamesController = new GamesController();

export default gamesController;