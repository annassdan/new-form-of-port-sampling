import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: 'filterHighlight'
})
export class FilterHighlightPipe implements PipeTransform {

  constructor(private _sanitizer:DomSanitizer) {
  }

  transform(value: any, ...args: any[]): any {
    if (value === undefined || String(value).trim().length === 0) {
      return this._sanitizer.bypassSecurityTrustHtml('');
    }

    if (!args) {
      return this._sanitizer.bypassSecurityTrustHtml(value);
    }

    const color = args[1] ? args[1] : 'primary';
    const regex = new RegExp(String(args[0]).trim(), 'gi');
    const content = String(value).replace(regex, match => {
      return `<strong class="${color}">${match}</strong>`;
    });

    return this._sanitizer.bypassSecurityTrustHtml(content);
  }

}
