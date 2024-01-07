import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BattleComponent } from './components/battle/battle.component';
import { ParticleComponent } from './components/particle/particle.component';
import { MazescrollerComponent } from './components/mazescroller/mazescroller.component';

const routes: Routes = [
  { path: '', redirectTo: '/maze', pathMatch: 'full' },
  { path: 'battle', component: BattleComponent },
  { path: 'particle', component: ParticleComponent },
  { path: 'maze', component: MazescrollerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
