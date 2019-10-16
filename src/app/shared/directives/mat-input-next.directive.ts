import {AfterViewInit, ContentChild, Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {MatInput} from '@angular/material';
import {fromMaterialExportAsNative} from '../material-util';

@Directive({
  selector: '[appMatInputNext]'
})
export class MatInputNextDirective implements AfterViewInit {

  @Output() beforeBlur = new EventEmitter<any>();
  @ContentChild(MatInput, {static: false}) input;
  @Input() previousTarget: any;
  @Input() nextTarget: any;

  private inputNativeElement;

  constructor() { }

  ngAfterViewInit(): void {
    this.inputNativeElement = fromMaterialExportAsNative(this.input);
  }

  isRequired = () => this.inputNativeElement ? this.inputNativeElement.required : false;

  /* meng-emit event callback jika saja user ingin melakukan sebuah aksi sebelum focus pindah ke next koponen */
  emitAction = async () => {
    await this.beforeBlur.emit({
      currentValue: this.inputNativeElement.value,
      nextTarget: this.nextTarget,
      previousTarget: this.previousTarget,
      current: this.input
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
    if ($event.key === 'Escape'|| $event.key === 'Esc') {
      $event.target.blur();
    }

    /* melakukan perpindahan fokus ke kompoenen sebelumnya */
    if ($event.ctrlKey && $event.key === 'Enter' && this.previousTarget) {
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

  }

}
