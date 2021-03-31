import { SystemService } from './../../systems/system.service';
import { System } from './../../systems/system.model';
import { GameService } from './../game.service';
import { Component, OnInit } from '@angular/core';
import { Game } from '../game.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css'],
})
export class GameDetailComponent implements OnInit {
  game: Game;

  constructor(
    private gameService: GameService,
    private SystemService: SystemService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      this.game = this.gameService.getGame(id);
    });
  }

  onDelete() {
    this.gameService.deleteGame(this.game);
    this.router.navigate(['/games'], { relativeTo: this.route });
  }
}
