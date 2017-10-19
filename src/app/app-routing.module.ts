import { AuthguardService } from './services/authguard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { MypostsComponent } from './myposts/myposts.component';
import { SigninComponent } from './signin/signin.component';

export const route: Routes = [
  { path: '', pathMatch: 'full', component: MainComponent, canActivate: [AuthguardService] },
  { path: 'signin', component: SigninComponent },
  { path: 'myposts', component: MypostsComponent, canActivate: [AuthguardService] },
  { path: '**', redirectTo: '' }
  
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(route)],
  providers: [],
})
export class AppRoutingModule {}