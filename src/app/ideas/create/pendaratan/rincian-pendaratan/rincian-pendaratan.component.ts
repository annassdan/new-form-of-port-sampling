import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MainStateService} from '../../../../shared/services/main-state.service';
import {PendaratanBrigeService} from '../pendaratan-brige.service';
import {FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MatDialogRef} from '@angular/material';
import {unsubscribes} from '../../../../shared/utils';
import {extractFormControlValue} from '../../../../shared/reactive-form-modeling';

@Component({
  selector: 'app-rincian-pendaratan',
  templateUrl: './rincian-pendaratan.component.html',
  styleUrls: ['./rincian-pendaratan.component.scss']
})
export class RincianPendaratanComponent implements OnInit, OnDestroy {

  defaultNamaKapal = 'Inputkan Nama Kapal';
  subs: Subscription[] = [];
  formRincianPendaratan: FormGroup;
  extractFormControlValue = extractFormControlValue;

  constructor(public rootState: MainStateService,
              public changeDetector: ChangeDetectorRef,
              public dialogRef: MatDialogRef<RincianPendaratanComponent>,
              public currentPendaratanState: PendaratanBrigeService) {
  }

  ngOnInit() {
    this.subs.push(this.currentPendaratanState.formRincianPendaratan$.subscribe(async value => {
      if (value === undefined) {
        await this.changeDetector.detectChanges();
        this.dialogRef.close();
      }


      unsubscribes(this.subs);
    }));
  }

  cek() {
    this.subs.push(this.currentPendaratanState.formRincianPendaratan$.subscribe(value => console.log(value)));
  }

  ngOnDestroy(): void {
    this.subs = unsubscribes(this.subs);
  }

  jh(event) {

  }
}
