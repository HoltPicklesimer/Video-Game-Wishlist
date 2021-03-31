import { SystemDetailComponent } from './systems/system-detail/system-detail.component';
import { SystemEditComponent } from './systems/system-edit/system-edit.component';
import { SystemsComponent } from './systems/systems.component';
import { GameDetailComponent } from './games/game-detail/game-detail.component';
import { GameEditComponent } from './games/game-edit/game-edit.component';
import { GamesComponent } from './games/games.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/games', pathMatch: 'full' },
  {
    path: 'games',
    component: GamesComponent,
    children: [
      { path: 'new', component: GameEditComponent },
      { path: ':id', component: GameDetailComponent },
      { path: ':id/edit', component: GameEditComponent },
    ],
  },
  {
    path: 'systems',
    component: SystemsComponent,
    children: [
      { path: 'new', component: SystemEditComponent },
      { path: ':id', component: SystemDetailComponent },
      { path: ':id/edit', component: SystemEditComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
