import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {MainStateService} from '../../shared/services/main-state.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MAX_WIDTH} from '../../shared/constants';
import {pendaratan} from '../../models/pendaratan/pendaratan';
import {Shared} from '../../shared/shared';
import {PendaratanBrigeService} from "./pendaratan/pendaratan-brige.service";
import {patchFormGroup} from "../../shared/reactive-form-modeling";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateDataComponent extends Shared implements OnInit, OnDestroy {

  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;
  subscribers: Subscription[] = [];

  constructor(public rootState: MainStateService,
              public currentPendaratanState: PendaratanBrigeService,
              public breakpointObserver: BreakpointObserver) {
    super();
  }

  ngOnInit() {
    /* listen untuk breakpointObserver */
    this.subscribers.push(
      this.breakpointObserver
        .observe([`(max-width: ${MAX_WIDTH}px)`])
        .subscribe(state => this.rootState.smallSizeReached(state.matches))
    );
  }

  ngOnDestroy(): void {
    this.subscribers.forEach(value => value.unsubscribe());
    this.subscribers = [];
  }

  /* ------------------------------------------------------------------------------------------------- */
  startSearch() {
    this.rootState.search(true);
  }

  checkEscape($event: any) {
    if ($event.key === 'Escape' || $event.key === 'Esc') {
      this.rootState.search(false);
    }
  }

  onInViewportChange($event: boolean) {
    this.rootState.breadcrumbAppearInViewport($event);
  }

  /* --------------------------------------------------------------------------------------------------- */


  async test() {
    await import(/* webpackChunkName: "settings" */ '../../../assets/settings/settings.js')
      .then(async m => await m.myFunction()).catch(reason => {
      });
  }


  resetFormPendaratan() {
    // this.currentPendaratanState.setFormPendaratan(createFormGroup(createFormGroupContent({...pendaratan, uuid: generateUUID()})));
    this.subscribers.push(this.currentPendaratanState.formPendaratan$.subscribe(value => patchFormGroup(value, pendaratan)));
  }


}
