import {Component, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {unsubscribes} from "../../../../shared/utils";
import {ReproduksiComponent} from "./reproduksi.component";
import {Platform} from "@angular/cdk/platform";
import {PendaratanBrigeService} from "../pendaratan-brige.service";
import {Router} from "@angular/router";


@Component({ template: '' })
export class ReproduksiContainer implements OnDestroy {

  subs: Subscription[] = [];

  constructor(public dialog: MatDialog, public currentPendaratanState: PendaratanBrigeService, router: Router) {
    this.subs.push(currentPendaratanState.formReproduksi$.subscribe(form => {
      if (form) {
        this.dialog.open(ReproduksiComponent, {
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
  }

}
