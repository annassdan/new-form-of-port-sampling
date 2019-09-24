import {MyMenu} from '../ideas/the-dashboard/the-dashboard.component';
import {MatInput} from '@angular/material';


export class Shared {

  content(small: boolean, search: boolean) {
    if (small && search)
      return 'when-small-and-search';
    else if (small && !search)
      return 'when-small-and-not-search';
    else if (!small && search)
      return 'when-not-small-and-search';
    else if (!small && !search)
      return 'when-not-small-and-not-search';

    return '';
  }


  isEmptyRoot(currentMenuInstance: MyMenu[]) {
    return currentMenuInstance.filter(value => value.isBack).length === 0;
  }


  onSearchHasRendered($input: MatInput) {
    $input.focus();
  }

}
