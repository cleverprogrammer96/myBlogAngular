import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './dashboard/screens/blog/blog.component';
import { LoginComponent } from './dashboard/screens/login/login.component';
import { NotfoundComponent } from './dashboard/screens/notfound/notfound.component';
import { AuthGuard } from './dashboard/services/authGuard';


const routes: Routes = [
  { path:"", redirectTo:"login", pathMatch:"full"},
  { path:"login", component:LoginComponent},
  { path:"blog", component:BlogComponent, canActivate:[AuthGuard]},
  { path:"**", component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
