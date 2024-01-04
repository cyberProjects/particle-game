import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BattleComponent } from './components/battle/battle.component';
import { ParticleComponent } from './components/particle/particle.component';

const routes: Routes = [
  { path: 'battle', component: BattleComponent },
  { path: 'particle', component: ParticleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
