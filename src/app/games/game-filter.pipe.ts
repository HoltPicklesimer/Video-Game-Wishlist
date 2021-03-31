import { Pipe, PipeTransform } from '@angular/core';
import { Game } from './game.model';

@Pipe({
  name: 'gamesFilter',
})
export class GamesFilterPipe implements PipeTransform {
  transform(games: Game[], term: string): any {
    let result: Game[] = [];

    if (term && term.length > 0) {
      result = games.filter((game: Game) => {
        return game.name.toLowerCase().includes(term.toLowerCase());
      });
    }

    return result.length < 1 ? games : result;
  }
}
