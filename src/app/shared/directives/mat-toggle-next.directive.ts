import {AfterViewInit, ContentChild, Directive, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {fromMaterialExportAsNative} from "../material-util";

@Directive({
  selector: '[appMatToggleNext]'
})
export class MatToggleNextDirective implements OnInit, AfterViewInit {

  @Input() str = '';
  @ContentChild(MatSlideToggle, {static: false}) toggle: MatSlideToggle;
  @Input() previousTarget: any;
  @Input() nextTarget: any;
  @Output() onFocus = new EventEmitter();
  @Output() onBlur = new EventEmitter();
  @Output() beforeBlur = new EventEmitter();

  private inputNativeElement;


  constructor() { }

  ngAfterViewInit(): void {
    this.inputNativeElement = fromMaterialExportAsNative(this.toggle);
  }

  ngOnInit(): void {
  }

  @HostListener('focusout', ['$event'])
  async blur($event) {
    this.onBlur.emit($event);
  }

  @HostListener('focusin', ['$event'])
  async focus($event) {
    this.onFocus.emit($event);
  }

  @HostListener('keyup', ['$event'])
  async onKeyup($event) {
    if ($event.key === 'ArrowLeft' && this.toggle.checked) {
      this.toggle.toggle();
    } else if ($event.key === 'ArrowRight' && !this.toggle.checked) {
      this.toggle.toggle();
    }

    if ($event.key === 'Escape'|| $event.key === 'Esc') {
      $event.target.blur();
    }

    /* melakukan perpindahan fokus ke kompoenen sebelumnya */
    if ($event.ctrlKey && $event.key === 'Enter' && this.previousTarget) {
      const previous = fromMaterialExportAsNative(this.previousTarget);
      if (previous) {
        await this.beforeBlur.emit();
        previous.focus();
      }
    }

    /* deteksi event key enter untuk berpindah ke komponent target */
    if (!$event.ctrlKey && $event.key === 'Enter' && this.nextTarget) {
      const next = fromMaterialExportAsNative(this.nextTarget);
      if (next) {
        await this.beforeBlur.emit();
        next.focus();
      }

    }
  }

}
