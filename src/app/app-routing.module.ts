import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ScanPageComponent } from "./scan-page/scan-page.component";
import {ChooseUserComponent} from "./choose-user/choose-user.component";

const appRoutes: Routes = [
  { path: '', component: ScanPageComponent},
  { path: 'scan-page', component: ScanPageComponent },
  { path: 'choose-user', component: ChooseUserComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes,
    )
  ],
  exports:[RouterModule],
  declarations: []
})
export class AppRoutingModule { }



