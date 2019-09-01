import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Game } from '../models/Game';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  /** Se obtienen todos los juegos almacenados */
  getGames(): Observable<Game> {
    return this.http.get(`${this.API_URI}/games`);
  }

  /** Se obtiene solamente un juego a partir del id */
  getGame(id: string): Observable<Game> {
    return this.http.get(`${this.API_URI}/games/${id}`);
  }

  /** Se elimina un juego */
  deleteGame(id: string): Observable<Game> {
    return this.http.delete(`${this.API_URI}/games/${id}`);
  }

  /** Se almacena un juego */
  saveGame(game: Game): Observable<Game> {
    return this.http.post(`${this.API_URI}/games/`, game);
  }

  updateGame(id: string|number, updateGame: Game): Observable<Game> {
    return this.http.put(`${this.API_URI}/games/${id}`, updateGame);
  }

}
