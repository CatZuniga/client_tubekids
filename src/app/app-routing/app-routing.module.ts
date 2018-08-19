import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { VideosComponent } from '../videos/videos.component';
import { ProfilesComponent } from '../profiles/profiles.component';

import { VideoskidComponent } from '../videoskid/videoskid.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'videos', component: VideosComponent, canActivate: [AuthGuard] },
  { path: 'profiles', component: ProfilesComponent, canActivate: [AuthGuard] },
  
  { path: 'videoskid', component: VideoskidComponent, canActivate: [AuthGuard] }

];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
