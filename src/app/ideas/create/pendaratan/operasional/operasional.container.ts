import {Component, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {unsubscribes} from "../../../../shared/utils";
import {OperasionalComponent} from "./operasional.component";

@Component({ template: ''})
export class OperasionalContainer implements OnDestroy {

  subs: Subscription[] = [];

  constructor(public dialog: MatDialog) {
    console.log('buka')

    const windowRef = this.dialog.open(OperasionalComponent, {
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