import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ScanPageComponent } from "./scan-page/scan-page.component";

const appRoutes: Routes = [
  { path: 'scan-page', component: ScanPageComponent },
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



