import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameDetailComponent } from './games/game-detail/game-detail.component';
import { GameEditComponent } from './games/game-edit/game-edit.component';
import { GameItemComponent } from './games/game-item/game-item.component';
import { GameListComponent } from './games/game-list/game-list.component';
import { SystemListComponent } from './systems/system-list/system-list.component';
import { SystemItemComponent } from './systems/system-item/system-item.component';
import { SystemEditComponent } from './systems/system-edit/system-edit.component';
import { SystemDetailComponent } from './systems/system-detail/system-detail.component';
import { GamesComponent } from './games/games.component';
import { SystemsComponent } from './systems/systems.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { DndModule } from 'ng2-dnd';
import { HttpClientModule } from '@angular/common/http';
import { SystemsFilterPipe } from './systems/system-filter.pipe';
import { GamesFilterPipe } from './games/game-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    GameDetailComponent,
    GameEditComponent,
    GameItemComponent,
    GameListComponent,
    SystemListComponent,
    SystemItemComponent,
    SystemEditComponent,
    SystemDetailComponent,
    GamesComponent,
    SystemsComponent,
    HeaderComponent,
    SystemsFilterPipe,
    GamesFilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DndModule.forRoot(),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
