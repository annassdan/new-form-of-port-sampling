import {clockMask, extractingValue, standardInputMask} from "./utils";
import {
  extractFormArray,
  extractFormControl,
  extractFormControlValue,
  extractFormGroup,
  isFormControlEmpty,
  patchFormGroup,
  resetFormGroup
} from "./reactive-form-modeling";
import {INIT_FADE_IN, JENIS_RUMPON, SUMBER_INFORMASI, WAKTU_SETTING, WPP} from "./constants";
import {AfterViewInit, ChangeDetectorRef} from "@angular/core";


export class Utilities implements AfterViewInit {

  public readonly toolbarWidthOnSmall = '100%';
  public readonly toolbarWidthOnBig = '80%';
  toolbarWidth = this.toolbarWidthOnSmall;

  standardInputMask = standardInputMask;

  clockMask = clockMask;

  extractFormControlValue = extractFormControlValue;

  isFormControlEmpty = isFormControlEmpty;

  extractFormGroup = extractFormGroup;

  extractFormArray = extractFormArray;

  extractFormControl = extractFormControl;

  extractingValue = extractingValue;

  resetFormGroup = resetFormGroup;

  patchFormGroup = patchFormGroup;

  wpp = WPP;

  rumpon = JENIS_RUMPON;

  waktuSetting = WAKTU_SETTING;

  sumberInformasi = SUMBER_INFORMASI;

  constructor(public ccd?: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.toolbarWidth = this.toolbarWidthOnBig;
      if (this.ccd) {
        this.ccd.detectChanges();
      }

    }, INIT_FADE_IN);
  }


  closeDialog() {
    history.back();
  }
}
