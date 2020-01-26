import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, of, Subscription} from "rxjs";
import {unsubscribes} from "../../../../shared/utils";
import {FormGroup} from "@angular/forms";
import {Utilities} from "../../../../shared/utilities";
import {animate, style, transition, trigger} from "@angular/animations";
import {FADE_TIME} from "../../../../shared/constants";
import {MainStateService} from "../../../../shared/services/main-state.service";
import {MatDialogRef} from "@angular/material/dialog";
import {PendaratanBrigeService} from "../pendaratan-brige.service";
import {OrganisasiService} from "../../../../services/master/organisasi.service";
import {SumberdayaService} from "../../../../services/master/sumberdaya.service";

@Component({
  selector: 'app-reproduksi',
  templateUrl: './reproduksi.component.html',
  styleUrls: ['./reproduksi.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(FADE_TIME, style({opacity: 1}))
      ])
    ])
  ]
})
export class ReproduksiComponent extends Utilities implements OnInit, OnDestroy, AfterViewInit {

  formReproduksi: FormGroup;
  subs: Subscription[] = [];

  constructor(public rootState: MainStateService,
              public changeDetector: ChangeDetectorRef,
              public dialogRef: MatDialogRef<ReproduksiComponent>,
              public currentPendaratanState: PendaratanBrigeService,
              public organisasiService: OrganisasiService,
              public sumberdayaService: SumberdayaService) { super(); }

  ngOnInit() {
    this.subs.push(this.currentPendaratanState.formReproduksi$.subscribe(async value => {
      if (value === undefined) {
        await this.changeDetector.detectChanges();
        this.dialogRef.close();
      } else {
        /* init form reproduksi */
        this.formReproduksi = value;
      }

      unsubscribes(this.subs);
    }));
  }


  ngOnDestroy(): void {
    this.subs = unsubscribes(this.subs);
  }

  pencatatSource = (): Observable<any[]> => {
    return of([
      { uuid: '1', nama: 'Muhammad Nur Annas', posisi: '' },
      { uuid: '2', nama: 'I Komang Suryana', posisi: '' },
      { uuid: '3', nama: 'Syaifullah', posisi: '' },
      { uuid: '4', nama: 'Arfan', posisi: '' }
    ]);
  };

}
