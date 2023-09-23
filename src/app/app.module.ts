import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { GameComponent } from './pages/game/game.component';
import { MonsterComponent } from './components/events/monster/monster.component';
import { BossComponent } from './components/events/boss/boss.component';
import { CampComponent } from './components/events/camp/camp.component';
import { TrapComponent } from './components/events/trap/trap.component';
import { ShopComponent } from './components/events/shop/shop.component';
import { LootComponent } from './components/events/loot/loot.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { MapComponent } from './components/map/map.component';
import { EventComponent } from './components/events/event/event.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    GameComponent,
    MonsterComponent,
    BossComponent,
    CampComponent,
    TrapComponent,
    ShopComponent,
    LootComponent,
    FooterComponent,
    MapComponent,
    EventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
