import {MatAutocompleteTrigger, MatButton, MatDatepickerInput, MatInput} from '@angular/material';

/**
 * Melakukan generate native element dari kustom component material
 * @param tag kustom component/class dari Angular Material
 */
export function fromMaterialExportAsNative(tag: any): any {
  if (!tag) {
    return undefined;
  }

  let nativeElement = tag;

  /* native komponent dari MatAutocompleteTrigger adalah input type text */
  if (tag instanceof MatAutocompleteTrigger) {
    nativeElement = tag['_element']['nativeElement'];
  }
  /* native komponent dari MatInput adalah input type text */
  else if (tag instanceof MatInput) {
    nativeElement = tag['_elementRef']['nativeElement'];
  }
  /* native komponent dari MatDatepickerInput adalah input type text */
  else if (tag instanceof MatDatepickerInput) {
    nativeElement = tag['_elementRef']['nativeElement'];
  }

  else if (tag instanceof MatButton) {
    // console.log(tag);
    nativeElement = tag['_elementRef']['nativeElement'];
  }

  return nativeElement;
}
