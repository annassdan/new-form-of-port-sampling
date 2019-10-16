import {ContentChild, Directive, HostListener, Type} from '@angular/core';

@Directive({
  selector: '[appMatInputAutoSelectAll]'
})
export class InputSelectTextDirective {

  @ContentChild('input', { static: false }) input: any;

  constructor() { }

  /* melakukan selet pada semua text yang terdapat pada mat input ketika component menerima event klik */
  @HostListener('click', ['$event'])
  onClick($event) {
    $event.target.select();
  }

  @HostListener('focus', ['$event'])
  onFocus($event) {
    $event.target.select();
  }


  @HostListener('keyup', ['$event'])
  onKeyup($event) {
    if ($event.key === 'Escape'|| $event.key === 'Esc') {
      $event.target.blur();
    }
  }


}
