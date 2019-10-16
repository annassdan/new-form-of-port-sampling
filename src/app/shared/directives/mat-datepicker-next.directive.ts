import {AfterViewInit, ContentChild, Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {MatDatepicker, MatDatepickerInput, MatInput} from '@angular/material';
import {fromMaterialExportAsNative} from '../material-util';

@Directive({
  selector: '[appMatDatepickerNext]'
})
export class MatDatepickerNextDirective implements AfterViewInit {

  @Output() beforeBlur = new EventEmitter<any>();
  @ContentChild(MatDatepickerInput, {static: false}) dateInput;
  @Input() previousTarget: any;
  @Input() nextTarget: any;

  private inputNativeElement;
  private datepicker: MatDatepicker<any>;

  constructor() { }

  ngAfterViewInit(): void {
    /* ambil reference datepicker dan input */
    this.datepicker = this.dateInput['_datepicker'];
    this.inputNativeElement = fromMaterialExportAsNative(this.dateInput);
  }

  isRequired = () => this.inputNativeElement ? this.inputNativeElement.required : false;

  /* meng-emit event callback jika saja user ingin melakukan sebuah aksi sebelum focus pindah ke next koponen */
  emitAction = async () => {
    await this.beforeBlur.emit({
      currentValue: this.inputNativeElement.value,
      nextTarget: this.nextTarget,
      previousTarget: this.previousTarget,
      current: this.dateInput
    });
  };

  @HostListener('click', ['$event'])
  onClick($event) {
    $event.target.select();
  }

  @HostListener('focus', ['$event'])
  onFocus($event) {
    $event.target.select();
  }


  @HostListener('keyup', ['$event'])
  async onKeyup($event) {
    if ($event.key=='Escape'|| $event.key=='Esc') {
      $event.target.blur();
    }

    /* melakukan perpindahan fokus ke kompoenen sebelumnya */
    if ($event.ctrlKey && $event.key == 'Enter' && this.previousTarget) {
      await this.emitAction();
      const previous = fromMaterialExportAsNative(this.previousTarget);
      if (previous) {
        previous.focus();
      }
    }

    /* deteksi event key enter untuk berpindah ke komponent target */
    if (!$event.ctrlKey && $event.key === 'Enter' && this.nextTarget) {
      const next = fromMaterialExportAsNative(this.nextTarget);
      await this.emitAction();
      if (!this.isRequired()) {
        next.focus();
      } else {
        if (String(this.inputNativeElement.value).length > 0) {
          next.focus();
        }
      }
    }


    /* deteksi event key key bawah untuk berpindah membuka kembali komponen datepicker */
    if (!$event.ctrlKey && $event.key === 'ArrowDown' && this.nextTarget) {
      this.datepicker.open();
    }
  }





}
