import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Host,
  Input,
  OnInit,
  Optional,
  SkipSelf,
  ViewChild
} from '@angular/core';
import {Utilities} from "../../utilities";
import {ControlContainer, ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";
import {IErrorStateMatcher} from "../../utils";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'i-text-input',
  exportAs: 'iText',
  templateUrl: './i-text-input.component.html',
  styleUrls: ['./i-text-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: ITextInputComponent,
    multi: true
  }]
})
export class ITextInputComponent extends Utilities implements OnInit, ControlValueAccessor {

  @Input() formControl: FormControl;

  @Input() formControlName: string;

  @Input() clearButton = true;

  /* untuk mengindikasikan bahwa tombol clear telah ditekan */
  public cleared = false;

  @Input() label: string;

  @Input() placeholder: string = '';

  @Input() disabled = false;

  /* when enter, move to next element */
  @Input() nextTo;

  /* when Ctrl + enter, move to previous element */
  @Input() previousTo;

  @Input() validator: Function;

  @Input() errorMessage = '';

  @Input() required = false;

  @Input() useHint = false;

  @Input() hintMessage = '';

  public matcher = new IErrorStateMatcher();

  @ViewChild('iText', {static: false}) input: ElementRef<HTMLInputElement>;

  @ViewChild(MatInput, {static: false}) matInput: MatInput;

  previousValue: any;

  constructor(@Optional() @Host() @SkipSelf()
              public controlContainer: ControlContainer,
              public cd: ChangeDetectorRef) { super(); }

  ngOnInit() {
    if (this.formControl && this.formControlName) {
      throw new Error('Cannot use formControl and formControlName in the same time');
    }

    if (this.formControlName) {
      this.formControl = this.getDisplayControl();
      this.previousValue = this.formControl.value;
    }

    if (this.disabled) {
      this.getDisplayControl().disable();
    }

    this.cd.detectChanges();
  }

  getFormGroupContainer() {
    return <FormGroup> this.controlContainer.control;
  }

  getDisplayControl(): FormControl {
    return this.formControlName ? (<FormControl>this.getFormGroupContainer().get(this.formControlName)) : this.formControl;
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
  }

  hasValue() {
    return String(this.getDisplayControl().value).trim().length > 0;
  }

  isNativeInputEmpty() {
    return this.input ? String(this.input.nativeElement.value).trim().length === 0 : true;
  }

  clear() {
    this.cleared = true;

    try {
      this.getDisplayControl().patchValue('');
      this.previousValue = undefined;
      this.input.nativeElement.blur();
      this.input.nativeElement.value = '';
    } catch (e) {}
  }
}
