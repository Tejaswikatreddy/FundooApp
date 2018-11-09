import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
// import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthGuard } from './core/guard/auth.guard'
import { AllNoteComponent } from './components/all-note/all-note.component';
import { SearchAllComponent } from './components/search-all/search-all.component';

import { MainArchiveComponent } from './components/main-archive/main-archive.component';
import { MainTrashComponent } from './components/main-trash/main-trash.component';
import { LabelNotesComponent } from './components/label-notes/label-notes.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'forgot', component: ForgotPasswordComponent},
  {
    path: '', component: NavbarComponent, canActivate: [AuthGuard],children:[
      { path: 'home', component: AllNoteComponent }, 
      {path:'archive',component:MainArchiveComponent },
      { path: 'trash', component: MainTrashComponent },

      { path: 'search', component:SearchAllComponent },
      {path:'label/:labelName',component:LabelNotesComponent}
    
  ]},
  {path:"resetpassword/:forgotToken",component:ResetPasswordComponent},
 

]
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  // declarations: [],
  
})
export class AppRoutingModule { }
