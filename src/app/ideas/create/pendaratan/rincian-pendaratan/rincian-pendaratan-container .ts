import {Component, OnDestroy} from '@angular/core';
import {MatDialog} from '@angular/material';
import {RincianPendaratanComponent} from './rincian-pendaratan.component';
import {Subscription} from 'rxjs';
import {unsubscribes} from '../../../../shared/utils';
import {Platform} from "@angular/cdk/platform";
import {PendaratanBrigeService} from "../pendaratan-brige.service";
import {Router} from "@angular/router";
import {UkuranComponent} from "../ukuran/ukuran.component";

@Component({ template: ''})
export class RincianPendaratanContainer implements OnDestroy {


  subs: Subscription[] = [];

  constructor(public dialog: MatDialog, public currentPendaratanState: PendaratanBrigeService, router: Router) {
    this.subs.push(currentPendaratanState.formRincianPendaratan$.subscribe(form => {
      if (form) {
        this.dialog.open(RincianPendaratanComponent, {
          disableClose: true,
          width: '100%',
          panelClass: 'remove-max-height',
          position: {bottom: '50px', top: '20px'}
        });
      }
    }));
  }

  ngOnDestroy(): void {
    this.subs = unsubscribes(this.subs);
    // console.log('destroying...')
  }




}
