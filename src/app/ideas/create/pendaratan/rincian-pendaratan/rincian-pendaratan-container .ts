import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {MatDialog} from '@angular/material';
import {RincianPendaratanComponent} from './rincian-pendaratan.component';
import {Subscription} from 'rxjs';
import {unsubscribes} from '../../../../shared/utils';

@Component({
  template: ``,
})
export class RincianPendaratanContainer implements OnDestroy {

  subs: Subscription[] = [];

  constructor(public dialog: MatDialog) {
    const rincianPendaratanRef = this.dialog.open(RincianPendaratanComponent, {
      disableClose: true,
      width: '100%',
      panelClass: 'remove-max-height',
      position: {bottom: '50px', top: '20px'}
    });

    this.subs.push(rincianPendaratanRef.afterClosed().subscribe(value => {
      history.back();
    }));
  }

  ngOnDestroy(): void {
    this.subs = unsubscribes(this.subs);
    console.log('destroying...')
  }


}
