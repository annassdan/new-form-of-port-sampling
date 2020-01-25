import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RincianPendaratanContainer} from './ideas/create/pendaratan/rincian-pendaratan/rincian-pendaratan-container ';
import {TheDashboardComponent} from './ideas/the-dashboard/the-dashboard.component';
import {OperasionalContainer} from "./ideas/create/pendaratan/operasional/operasional.container";
import {UkuranContainer} from "./ideas/create/pendaratan/ukuran/ukuran.container";
import {ReproduksiContainer} from "./ideas/create/pendaratan/reproduksi/reproduksi.container";


const routes: Routes = [
  {
    path: '',
    component: TheDashboardComponent,
    children: [
      {
        path: 'rincian-pendaratan/:uuid',
        component: RincianPendaratanContainer
      },
      {
        path: 'operasional/:uuid',
        component: OperasionalContainer
      },
      {
        path: 'ukuran/:uuid',
        component: UkuranContainer
      },
      {
        path: 'reproduksi/:uuid',
        component: ReproduksiContainer
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
