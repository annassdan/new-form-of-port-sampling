import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RincianPendaratanContainer} from './ideas/create/pendaratan/rincian-pendaratan/rincian-pendaratan-container ';
import {TheDashboardComponent} from './ideas/the-dashboard/the-dashboard.component';


const routes: Routes = [
  {
    path: '',
    component: TheDashboardComponent,
    children: [
      {
        path: 'rincian-pendaratan',
        component: RincianPendaratanContainer
      },
    ]
  },

  // {
  //   path: 'at',
  //   loadChildren: () => import('./ideas/master/alat-tangkap/alat-tangkap.module').then(m => m.AlatTangkapModule)
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
