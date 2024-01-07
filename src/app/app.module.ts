import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BattleComponent } from './components/battle/battle.component';
import { ParticleComponent } from './components/particle/particle.component';
import { MazescrollerComponent } from './components/mazescroller/mazescroller.component';

@NgModule({
  declarations: [
    AppComponent,
    BattleComponent,
    ParticleComponent,
    MazescrollerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
