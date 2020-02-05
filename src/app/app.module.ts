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
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatSlideToggleModule,
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
import {MatInputNextDirective} from './shared/directives/mat-input-next.directive';
import {MatDatepickerNextDirective} from './shared/directives/mat-datepicker-next.directive';
import {RincianPendaratanComponent} from './ideas/create/pendaratan/rincian-pendaratan/rincian-pendaratan.component';
import {RincianPendaratanContainer} from './ideas/create/pendaratan/rincian-pendaratan/rincian-pendaratan-container ';
import {MatStepperModule} from "@angular/material/stepper";
import {TextMaskModule} from "angular2-text-mask";
import {IAutocompleteComponent} from './shared/conponents/i-autocomplete/i-autocomplete.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ITextInputComponent} from './shared/conponents/i-text-input/i-text-input.component';
import {CdkStepperModule} from "@angular/cdk/stepper";
import { OperasionalComponent } from './ideas/create/pendaratan/operasional/operasional.component';
import { UkuranComponent } from './ideas/create/pendaratan/ukuran/ukuran.component';
import { ReproduksiComponent } from './ideas/create/pendaratan/reproduksi/reproduksi.component';
import {HttpClientModule} from "@angular/common/http";
import {OperasionalContainer} from "./ideas/create/pendaratan/operasional/operasional.container";
import {ReproduksiContainer} from "./ideas/create/pendaratan/reproduksi/reproduksi.container";
import {UkuranContainer} from "./ideas/create/pendaratan/ukuran/ukuran.container";
import {MatCardModule} from "@angular/material/card";
import { InitializingComponent } from './ideas/the-dashboard/ghosts/initializing/initializing.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import { IToggleComponent } from './shared/conponents/i-toggle/i-toggle.component';
import { MatToggleNextDirective } from './shared/directives/mat-toggle-next.directive';
import { DomPurifyPipe } from './shared/pipes/dom-purify.pipe';
import { FilterHighlightPipe } from './shared/pipes/filter-highlight.pipe';

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
    RincianPendaratanContainer,
    IAutocompleteComponent,
    ITextInputComponent,
    OperasionalComponent,
    UkuranComponent,
    ReproduksiComponent,
    OperasionalContainer,
    ReproduksiContainer,
    UkuranContainer,
    InitializingComponent,
    IToggleComponent,
    MatToggleNextDirective,
    DomPurifyPipe,
    FilterHighlightPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    NgxElectronModule,

    HttpClientModule,

    /* dari angular cdk */
    LayoutModule,
    MatCardModule,

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
    MatStepperModule,

    InViewportModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatDialogModule,
    MatSlideToggleModule,
    TextMaskModule,
    MatProgressSpinnerModule,
    FlexLayoutModule
  ],
  entryComponents: [
    RincianPendaratanComponent,
    OperasionalComponent,
    UkuranComponent,
    ReproduksiComponent
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
