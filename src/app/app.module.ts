import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatChipsModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import {TheDashboardComponent} from './ideas/the-dashboard/the-dashboard.component';
import {LayoutModule} from '@angular/cdk/layout';
import {TextSkeletonComponent} from './shared/conponents/text-skeleton/text-skeleton.component';
import {StandardGhostComponent} from './ideas/the-dashboard/ghosts/standard-ghost/standard-ghost.component';
import {WhenElementRenderedDirective} from './shared/directives/when-element-rendered.directive';
import {InViewportModule} from '@thisissoon/angular-inviewport';
import {NoContentComponent} from './ideas/the-dashboard/ghosts/no-content/no-content.component';
import {NgxElectronModule} from 'ngx-electron';
import {FormsModule} from '@angular/forms';
import { CreateComponent } from './ideas/create/create.component';

@NgModule({
  declarations: [
    AppComponent,
    TheDashboardComponent,
    TextSkeletonComponent,
    StandardGhostComponent,
    WhenElementRenderedDirective,
    NoContentComponent,
    CreateComponent
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
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
