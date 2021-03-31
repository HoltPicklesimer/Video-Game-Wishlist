import { SystemService } from './../../systems/system.service';
import { System } from './../../systems/system.model';
import { GameService } from './../game.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Game } from '../game.model';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.css'],
})
export class GameEditComponent implements OnInit {
  originalGame: Game;
  game: Game;
  systems: System[] = [];
  currentSystems: System[] = [];
  editMode: boolean = false;
  id: string;
  invalidGame: boolean = false;

  constructor(
    private systemService: SystemService,
    private gameService: GameService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentSystems = this.systemService.getSystems();
    this.systemService.systemListChangedEvent.subscribe((systemData) => {
      this.currentSystems = systemData;
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params.id;

      if (!this.id) {
        this.editMode = false;
        return;
      }

      this.originalGame = this.gameService.getGame(this.id);

      if (!this.originalGame) {
        return;
      }

      this.editMode = true;
      this.game = JSON.parse(JSON.stringify(this.originalGame));

      if (this.game.systems) {
        this.systems = JSON.parse(JSON.stringify(this.game.systems));
      }
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newGame = new Game(
      this.game?.id || '',
      value.name,
      value.wanted || false,
      value.have || false,
      value.description,
      value.imageUrl,
      value.developer,
      value.genre,
      this.systems
    );

    if (this.editMode) {
      this.gameService.updateGame(this.originalGame, newGame);
    } else {
      this.gameService.addGame(newGame);
    }

    this.router.navigate(['/games']);
  }

  onCancel() {
    this.router.navigate(['/games']);
  }

  checkSystem(id: string) {
    return this.systems.find((system) => system.id === id);
  }

  auditSystem(id: string) {
    const system = this.currentSystems.find((system) => system.id === id);
    if (this.checkSystem(id)) {
      const systemIndex = this.systems.indexOf(system);
      this.systems.splice(systemIndex, 1);
    } else {
      this.systems.push(system);
    }
  }
}
