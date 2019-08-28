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
        const game = await pool.query('SELECT * FROM games WHERE id = ?', [req.params.id]);
        res.json(game);
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

    public async update(req: Request, res: Response): Promise<void> {
        await pool.query('UPDATE games SET image = ? WHERE id = ?', [req.body, req.params.id]);
        res.json({ message: 'Game ' + req.params.id + ' updated' });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        await pool.query('DELETE FROM games WHERE id = ?', [req.params.id]);
        res.json({ message: 'Game ' + req.params.id + ' deleted' });
    }
}

const gamesController = new GamesController();

export default gamesController;