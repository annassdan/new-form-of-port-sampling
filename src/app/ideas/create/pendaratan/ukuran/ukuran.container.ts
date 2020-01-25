import {Component, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {unsubscribes} from "../../../../shared/utils";
import {UkuranComponent} from "./ukuran.component";


@Component({ template: '' })
export class UkuranContainer implements OnDestroy {

  subs: Subscription[] = [];

  constructor(public dialog: MatDialog) {
    const windowRef = this.dialog.open(UkuranComponent, {
      disableClose: true,
      width: '100%',
      panelClass: 'remove-max-height',
      position: {bottom: '50px', top: '20px'}
    });

    this.subs.push(windowRef.afterClosed().subscribe(value => {
      history.back();
    }));
  }

  ngOnDestroy(): void {
    this.subs = unsubscribes(this.subs);
  }

}
