import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EmptyComponent } from './components/empty/empty.component';


const routes :Routes =[
  {path:'empty', component : EmptyComponent },
  {path:'app', component : AppComponent }


]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports : [
    RouterModule
  ],
  providers :[]
})
export class AppRoutingModule { }
