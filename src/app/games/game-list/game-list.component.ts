import { GameService } from './../game.service';
import { Component, OnInit } from '@angular/core';
import { Game } from '../game.model';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css'],
})
export class GameListComponent implements OnInit {
  games: Game[] = [];
  term: string = '';

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.games = this.gameService.getGames();

    this.gameService.gameListChangedEvent.subscribe((games: Game[]) => {
      this.games = games;
    });
  }

  search(value: string) {
    this.term = value;
  }
}
