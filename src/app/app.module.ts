import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatChipsModule, MatDatepickerModule, MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatSidenavModule, MatSlideToggleModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {TheDashboardComponent} from './ideas/the-dashboard/the-dashboard.component';
import {LayoutModule} from '@angular/cdk/layout';
import {TextSkeletonComponent} from './shared/conponents/text-skeleton/text-skeleton.component';
import {StandardGhostComponent} from './ideas/the-dashboard/ghosts/standard-ghost/standard-ghost.component';
import {WhenElementRenderedDirective} from './shared/directives/when-element-rendered.directive';
import {InViewportModule} from '@thisissoon/angular-inviewport';
import {NoContentComponent} from './ideas/the-dashboard/ghosts/no-content/no-content.component';
import {NgxElectronModule} from 'ngx-electron';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CreateComponent} from './ideas/create/create.component';
import {PendaratanComponent} from './ideas/create/pendaratan/pendaratan.component';
import {InputSelectTextDirective} from './shared/directives/input-select-text.directive';
import {MatAutocompleteNextDirective} from './shared/directives/mat-autocomplete-next.directive';
import {MAT_MOMENT_DATE_FORMATS} from '@angular/material-moment-adapter';
import {IonMomentDateAdapter} from './shared/ion-moment-date-adapter';
import { MatInputNextDirective } from './shared/directives/mat-input-next.directive';
import { MatDatepickerNextDirective } from './shared/directives/mat-datepicker-next.directive';
import { RincianPendaratanComponent } from './ideas/create/pendaratan/rincian-pendaratan/rincian-pendaratan.component';
import {RincianPendaratanContainer} from './ideas/create/pendaratan/rincian-pendaratan/rincian-pendaratan-container ';
import {PendaratanBrigeService} from './ideas/create/pendaratan/pendaratan-brige.service';

@NgModule({
  declarations: [
    AppComponent,
    TheDashboardComponent,
    TextSkeletonComponent,
    StandardGhostComponent,
    WhenElementRenderedDirective,
    NoContentComponent,
    CreateComponent,
    PendaratanComponent,
    InputSelectTextDirective,
    MatAutocompleteNextDirective,
    MatInputNextDirective,
    MatDatepickerNextDirective,
    RincianPendaratanComponent,
    RincianPendaratanContainer
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    NgxElectronModule,

    /* dari angular cdk */
    LayoutModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule,
    MatProgressBarModule,
    MatButtonToggleModule,

    InViewportModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatDialogModule,
    MatSlideToggleModule
  ],
  entryComponents: [
    RincianPendaratanComponent
  ],
  providers: [
    /* Provide formating tanggal emnggunakan moment js dan angular */
    { provide: DateAdapter, useClass: IonMomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    /**/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
