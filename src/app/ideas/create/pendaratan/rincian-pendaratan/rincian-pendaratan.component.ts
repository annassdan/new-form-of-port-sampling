import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MainStateService} from '../../../../shared/services/main-state.service';
import {PendaratanBrigeService} from '../pendaratan-brige.service';
import {FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MatDialogRef} from '@angular/material';
import {unsubscribes} from '../../../../shared/utils';
import {extractFormControlValue, isFormControlEmpty} from '../../../../shared/reactive-form-modeling';
import {NON_STATIC_VIEW_CHILD} from "../../../../shared/constants";
import {MatInput} from "@angular/material/input";
import {fromMaterialExportAsNative} from "../../../../shared/material-util";

@Component({
  selector: 'app-rincian-pendaratan',
  templateUrl: './rincian-pendaratan.component.html',
  styleUrls: ['./rincian-pendaratan.component.scss']
})
export class RincianPendaratanComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('targetNamaKapal', NON_STATIC_VIEW_CHILD) namaKapalElement: MatInput;
  defaultNamaKapal = 'Inputkan Nama Kapal';
  subs: Subscription[] = [];
  formRincianPendaratan: FormGroup;
  extractFormControlValue = extractFormControlValue;
  isFormControlEmpty = isFormControlEmpty;

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

  ngAfterViewInit(): void {
    /**
     * Melakukan focus pada element input nama kapal.
     * Delay beberapa miliseccond untuk menghindari error pada change detector
     */
     setTimeout(() => {
      const nkNative = fromMaterialExportAsNative(this.namaKapalElement);
      if (nkNative && String(nkNative.value).length === 0) {
        nkNative.focus();
      }
     }, 500);
    /**/
  }


}
