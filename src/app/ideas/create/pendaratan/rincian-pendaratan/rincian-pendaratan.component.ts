import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MainStateService} from '../../../../shared/services/main-state.service';
import {PendaratanBrigeService} from '../pendaratan-brige.service';
import {Form, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MatDialogRef} from '@angular/material';
import {unsubscribes} from '../../../../shared/utils';
import {
  addFormArrayMember, createFormGroup, createFormGroupContent, extractAllMemberOfFormArray,
  extractFormControlValue,
  isFormControlEmpty
} from '../../../../shared/reactive-form-modeling';
import {NON_STATIC_VIEW_CHILD} from "../../../../shared/constants";
import {MatInput} from "@angular/material/input";
import {fromMaterialExportAsNative} from "../../../../shared/material-util";
import {hasilTangkapanPendaratan, rincianPendaratan} from "../../../../models/pendaratan/pendaratan";

@Component({
  selector: 'app-rincian-pendaratan',
  templateUrl: './rincian-pendaratan.component.html',
  styleUrls: ['./rincian-pendaratan.component.scss']
})
export class RincianPendaratanComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('targetNamaKapal', NON_STATIC_VIEW_CHILD) namaKapalElement: MatInput;
  @ViewChild('scrollMe', NON_STATIC_VIEW_CHILD) private myScrollContainer: ElementRef;

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
      } else {
        /* init form rincian pendaratan */
        this.formRincianPendaratan = value;
      }

      unsubscribes(this.subs);
    }));
  }


  listOfHasilTangkapan(formArrayControlName: string) {
    return this.formRincianPendaratan ? extractAllMemberOfFormArray(this.formRincianPendaratan, formArrayControlName) : [];
  }

  addHasilTangkapan(formControlArrayName: string) {
    addFormArrayMember(this.formRincianPendaratan, formControlArrayName, createFormGroup(createFormGroupContent(hasilTangkapanPendaratan)))
      .then(r => {
        console.log(this.formRincianPendaratan)
        this.changeDetector.detectChanges();
        this.scrollToBottom();
      }).catch();
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

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }


}
