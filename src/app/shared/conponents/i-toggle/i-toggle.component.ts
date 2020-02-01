import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Host,
  Input,
  OnInit,
  Optional,
  Output,
  SkipSelf,
  ViewChild
} from '@angular/core';
import {ControlContainer, ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";
import {ThemePalette} from "@angular/material/core";

@Component({
  selector: 'i-toggle',
  exportAs: 'IToggle',
  templateUrl: './i-toggle.component.html',
  styleUrls: ['./i-toggle.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: IToggleComponent,
    multi: true
  }]
})
export class IToggleComponent implements OnInit, ControlValueAccessor {

  @Input() labelPosition: 'before' | 'after' = "after";

  @Input() color: ThemePalette = "primary";

  @Input() formControl: FormControl;

  @Input() formControlName: string;

  @Input() clearButton = true;

  @Input() label: string;

  @Input() disabled = false;

  /* when enter, move to next element */
  @Input() nextTo;

  /* when Ctrl + enter, move to previous element */
  @Input() previousTo;

  @Output() onToggled = new EventEmitter();

  @ViewChild('iToggle', {static: false}) toggle: ElementRef<HTMLInputElement>;

  focus = false;

  constructor(@Optional() @Host() @SkipSelf()
              public controlContainer: ControlContainer,
              public cd: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.formControl && this.formControlName) {
      throw new Error('Cannot use formControl and formControlName in the same time');
    }

    if (this.formControlName) {
      this.formControl = this.getDisplayControl();
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

  onFocus($event: any) {
    this.focus = true;
  }

  onBlur($event: any) {
    this.focus = false;
  }

  beforeBlur() {
    this.focus = false;
    this.cd.detectChanges();
  }

}
