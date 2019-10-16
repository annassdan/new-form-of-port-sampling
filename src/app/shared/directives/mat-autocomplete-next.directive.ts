import {
  AfterViewInit,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {MatAutocomplete, MatAutocompleteTrigger, MatInput, MatOptionSelectionChange} from '@angular/material';
import {Subscription} from 'rxjs';
import {EMPTY} from '../constants';
import {fromMaterialExportAsNative} from '../material-util';

@Directive({
  selector: '[appMatAutocompleteNext]'
})
export class MatAutocompleteNextDirective implements AfterViewInit, OnDestroy {

  @Output() beforeBlur = new EventEmitter<any>();
  @ContentChild(MatAutocompleteTrigger, {static: false}) trigger;
  @Input() previousTarget: any;
  @Input() nextTarget: any;

  private subscription: Subscription;
  private autocomplete: MatAutocomplete;
  private triggerNativeElement;
  private triggerText = EMPTY;

  constructor() {
  }

  ngAfterViewInit(): void {
    /* ambil reference autocomplete dan input */
    this.autocomplete = this.trigger.autocomplete;
    this.triggerNativeElement = fromMaterialExportAsNative(this.trigger);

    /* menambahkan event listener real input komponen trigger dari autocomplete */
    this.triggerNativeElement.addEventListener('click', $event => $event.target.select());
    this.triggerNativeElement.addEventListener('focus', $event => $event.target.select());

    /* inisialisasi nilai trigger text */
    this.triggerText = this.trigger && this.trigger.panelOpen && fromMaterialExportAsNative(this.trigger)
      ? fromMaterialExportAsNative(this.trigger).value : EMPTY;

    /* subscriibe pada setiap p[erubahan nilai */
    this.subscription = this.trigger.panelClosingActions
      .subscribe((value: MatOptionSelectionChange) => this.triggerText = value && value.source ? value.source.value : this.triggerText);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  isRequired = () => this.triggerNativeElement ? this.triggerNativeElement.required : false;

  /* menutup panel dari autocomplete */
  syncWheterPanelIsOpen = () => this.trigger && this.trigger.panelOpen ? this.trigger.closePanel() : null;

  /* meng-emit event callback jika saja user ingin melakukan sebuah aksi sebelum focus pindah ke next koponen */
  emitAction = async () => {
    await this.beforeBlur.emit({
      currentValue: this.triggerText,
      nextTarget: this.nextTarget,
      previousTarget: this.previousTarget,
      current: this.trigger
    });
  };

  @HostListener('keyup', ['$event'])
  async onKeyup($event) {

    /* melakukan perpindahan fokus ke kompoenen sebelumnya */
    if ($event.ctrlKey && $event.key === 'Enter' && this.previousTarget) {
      await this.emitAction();
      await this.syncWheterPanelIsOpen();

      const previous = fromMaterialExportAsNative(this.previousTarget);
      if (previous) {
        previous.focus();
      }
    }

    /* deteksi event key enter untuk berpindah ke komponent target */
    if (!$event.ctrlKey && $event.key === 'Enter' && this.nextTarget) {

      let next = fromMaterialExportAsNative(this.nextTarget);
      await this.emitAction();
      if (!this.isRequired()) {
        await this.syncWheterPanelIsOpen();
        next.focus();
      } else {
        if (this.triggerText.length > 0) {
          await this.syncWheterPanelIsOpen();
          next.focus();
        }
      }
    }


  }

}
