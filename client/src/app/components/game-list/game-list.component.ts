import { Component, OnInit, HostBinding } from '@angular/core';

import { GamesService } from '../../services/games.service';
import { Game } from '../../models/Game';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  games: Game;
  @HostBinding('class') classes = 'row';

  constructor(private gamesService: GamesService) { }

  ngOnInit() {
    this.getGames();
  }

  deleteGame(id: string) {
    this.gamesService.deleteGame(id).subscribe(
      res => {
        this.getGames();
      },
      err => console.error(err)
    );
  }

  getGames() {
    this.gamesService.getGames().subscribe(
      res => {
        this.games = res;
      },
      err => console.error(err)
    );
  }

}
