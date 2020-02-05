import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: 'domPurify'
})
export class DomPurifyPipe implements PipeTransform {

  constructor(private _sanitizer:DomSanitizer) {
  }

  transform(value: any, ...args: any[]): any {
    return this._sanitizer.bypassSecurityTrustHtml(value);
  }

}
