import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: 'filterHighlight'
})
export class FilterHighlightPipe implements PipeTransform {

  constructor(private _sanitizer:DomSanitizer) {
  }

  transform(value: any, args: any): any {
    if (value === undefined || String(value).trim().length === 0) {
      return this._sanitizer.bypassSecurityTrustHtml('');
    }

    if (!args) {
      return this._sanitizer.bypassSecurityTrustHtml(value);
    }

    const regex = new RegExp(String(args).trim(), 'gi');
    const content = String(value).replace(regex, match => {
      return `<strong class="primary">${match}</strong>`;
    });

    return this._sanitizer.bypassSecurityTrustHtml(content);
  }

}
