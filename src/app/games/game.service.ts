import { SystemService } from './../systems/system.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Game } from './game.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  gameListChangedEvent = new Subject<Game[]>();
  private games: Game[] = [];

  constructor(private http: HttpClient) {
    this.fetchGames();
  }

  getGames(): Game[] {
    return this.games.slice().sort((a, b) => {
      if (a.wanted < b.wanted) return 1;
      if (a.wanted > b.wanted) return -1;
      if (a.have < b.have) return 1;
      if (a.have > b.have) return -1;
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });
  }

  getGame(id: string) {
    return this.games.find((c) => c.id === id);
  }

  deleteGame(game: Game) {
    if (!game) {
      return;
    }

    const pos = this.games.findIndex((c) => c.id === game.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http
      .delete('http://localhost:3000/games/' + game.id)
      .subscribe((response: Response) => {
        this.games.splice(pos, 1);
        this.sortAndSend();
      });
  }

  addGame(game: Game) {
    if (!game) {
      return;
    }

    // make sure id of the new Contact is empty
    game.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ message: string; game: Game }>(
        'http://localhost:3000/games',
        game,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new game to games
        // Need to add the systems back (not sent by response)
        responseData.game.systems = game.systems;
        this.games.push(responseData.game);
        this.sortAndSend();
      });
  }

  updateGame(originalGame: Game, newGame: Game) {
    if (!originalGame || !newGame) {
      return;
    }

    const pos = this.games.findIndex((d) => d.id === originalGame.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Game to the id of the old Game
    newGame.id = originalGame.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http
      .put('http://localhost:3000/games/' + originalGame.id, newGame, {
        headers: headers,
      })
      .subscribe((response: Response) => {
        this.games[pos] = newGame;
        this.sortAndSend();
      });
  }

  fetchGames() {
    this.http
      .get<Game[]>('http://localhost:3000/games')
      .subscribe((response: any) => {
        this.games = response.games;
        this.sortAndSend();
      });
  }

  sortAndSend() {
    this.gameListChangedEvent.next(
      this.games.slice().sort((a, b) => {
        if (a.wanted < b.wanted) return 1;
        if (a.wanted > b.wanted) return -1;
        if (a.have < b.have) return 1;
        if (a.have > b.have) return -1;
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
      })
    );
  }
}
