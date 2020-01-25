import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {MainStateService} from "../../../../shared/services/main-state.service";
import {PendaratanBrigeService} from "../pendaratan-brige.service";
import {MatDialogRef} from "@angular/material/dialog";
import {unsubscribes} from "../../../../shared/utils";
import {Observable, of, Subscription} from "rxjs";
import {Utilities} from "../../../../shared/utilities";
import {OrganisasiService} from "../../../../services/master/organisasi.service";
import {SumberdayaService} from "../../../../services/master/sumberdaya.service";
import {FADE_TIME, NON_STATIC_VIEW_CHILD} from "../../../../shared/constants";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-operasional',
  templateUrl: './operasional.component.html',
  styleUrls: ['./operasional.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(FADE_TIME, style({opacity: 1}))
      ])
    ])
  ]
})
export class OperasionalComponent extends Utilities implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('scrollMe', NON_STATIC_VIEW_CHILD) private myScrollContainer: ElementRef;


  formOperasional: FormGroup;
  subs: Subscription[] = [];

  constructor(public rootState: MainStateService,
              public changeDetector: ChangeDetectorRef,
              public dialogRef: MatDialogRef<OperasionalComponent>,
              public currentPendaratanState: PendaratanBrigeService,
              public organisasiService: OrganisasiService,
              public sumberdayaService: SumberdayaService) { super(); }

  ngOnInit() {
    this.subs.push(this.currentPendaratanState.formOperasional$.subscribe(async value => {
      if (value === undefined) {
        await this.changeDetector.detectChanges();
        this.dialogRef.close();
      } else {
        /* init form operasional */
        this.formOperasional = value;
      }

      unsubscribes(this.subs);
    }));
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
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
