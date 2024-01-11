import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BattleComponent } from './components/battle/battle.component';
import { ParticleComponent } from './components/particle/particle.component';
import { MazescrollerComponent } from './components/mazescroller/mazescroller.component';
import { IndexComponent } from './components/index/index.component';

const routes: Routes = [
  { path: '', redirectTo: '/particle', pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  { path: 'battle', component: BattleComponent },
  { path: 'particle', component: ParticleComponent },
  { path: 'maze', component: MazescrollerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
