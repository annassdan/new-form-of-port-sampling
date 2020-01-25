import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Host,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  SkipSelf,
  ViewChild
} from '@angular/core';
import {ControlContainer, ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";
import {MatAutocompleteSelectedEvent, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {extractingValue, IErrorStateMatcher, isArray, isFunction, isObject, isString, unsubscribes} from "../../utils";
import {EMPTY, PK_COLUMN} from "../../constants";
import {BehaviorSubject, Observable, of, Subject, Subscription} from "rxjs";
import {MatFormFieldAppearance} from "@angular/material/form-field/typings/form-field";
import {Utilities} from "../../utilities";
import {MatOption} from "@angular/material/core";

export type SearchType = 'includes' | 'equals';

export type AutoMode = 'lazy' | 'eager' | 'initially';

export type PropDisplay = {
  /* local = nama properti nya yang ada dalam formgroup */
  local: string,
  /* api = nama propertinya yang terdapat dalam each object respon dari API-endpoint*/
  api: string
};

@Component({
  selector: 'i-autocomplete',
  exportAs: 'iAutocomplete',
  templateUrl: './i-autocomplete.component.html',
  styleUrls: ['./i-autocomplete.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: IAutocompleteComponent,
    multi: true
  }]
})
export class IAutocompleteComponent extends Utilities implements OnInit, OnDestroy, AfterViewInit, ControlValueAccessor {

  loadingStyleWhenCloseButtonExists = {
    position: 'absolute',
    margin: '-15px 0 0 -33px'
  };

  loadingStyleWhenCloseButtonNotExists = {
    position: 'absolute',
    margin: '-32px 0px 0px -41px'
  };

  readonly isEager = () => this.mode === 'eager';

  readonly eager: AutoMode = 'eager';

  readonly isLazy = () => this.mode === 'lazy';

  readonly lazy: AutoMode = 'lazy';

  readonly isInitially = () => this.mode === 'initially';

  readonly initially: AutoMode = 'initially';

  @Input() fakeDelay = 1000;

  /* digunakan sebagai counter parameter untuk set data temporary di options */
  public counter = -1;

  /* ketika user mulai melakukan typing */
  public typing = false;

  public failOnFetch = false;

  public successOnFetch = false;

  public initialized = false;

  public subs: Subscription[] = [];

  @Input() mode: AutoMode = 'eager';

  @Input() appearance: MatFormFieldAppearance;

  /* Progress loading indikator ketika proses pencarian/filtering dilakukan pada autocomplete */
  @Input() useProgress = false;

  @Input() formGroup: FormGroup;

  @Input() formGroupName: string;

  @Input() formControl: FormControl;

  @Input() formControlName: string;


  @Input() clearButton = true;

  /* untuk mengindikasikan bahwa tombol clear telah ditekan */
  public cleared = false;

  /* List data yang akan digunakan sebagai data dasar untuk ditampilkan di option */
  @Input() targetOptions: { [key: string]: any }[] | Function;

  @Input() withFilter: ((data: any[], text: string) => any[]);

  /**
   * Asumsi jika @options merupakan Function untuk fetch data ke endpoint,
   * maka akan digunakan sebagai parameter untuk proses fetch ke endpoint
   */
  @Input() optionsParams: { [key: string]: any };

  @Input() transformFetchResult: ((result: any) => any);

  /* result data hasil filter yang akan di render ke option list */
  tempOptions: Observable<any> = of([]);

  originalData: any[] = [];

  @Input() label: string;

  @Input() placeholder: string = '';

  @Input() ariaLabel: string = '';

  @Input() displayProp: PropDisplay | string[] | string;

  @Input() idProp: string | PropDisplay = PK_COLUMN;

  @Input() filterOnProp: PropDisplay | string[] | string;

  @Input() disabled = false;

  /* when enter, move to next element */
  @Input() nextTo;

  /* when Ctrl + enter, move to previous element */
  @Input() previousTo;

  @Input() validator: Function;

  @Input() errorMessage = '';

  @Input() required = false;

  @Input() useHint = false;

  @Input() hintMessage = '';

  public matcher = new IErrorStateMatcher();

  @ViewChild('autoInput', {static: false}) input: ElementRef<HTMLInputElement>;

  @ViewChild(MatAutocompleteTrigger, {static: false}) matAutoTrigger: MatAutocompleteTrigger;

  /* jika arraynya kosong, maka diasumsikan akan berpengaruh ke semua properti yang ada pada formgroup */
  // @Input() affectedTo: ( PropDisplay | string)[] = [];

  @Output() optionSelected = new EventEmitter<MatAutocompleteSelectedEvent>();

  public undoChanges: Subject<any>;

  previousValue: any;

  selectedMatOption: MatOption;

  /* jika user malakukan pendeklarasian formGroupName dan formControlName secara pada komponen ini */
  hasErrorWhileSelectingDefineControlType = false;

  transformDisplay = (opt?) => opt ? extractingValue(opt, this.whatPropType(this.displayProp)) : EMPTY;

  whatPropType = (prop, whichProp = 'api') => {
    if (isObject(prop)) {
      return (<PropDisplay>this.displayProp)[whichProp]
    } else if (isArray(prop)) {
      return <string[]>this.displayProp;
    } else if (isString(prop)) {
      return <string>prop;
    }
    return [];
  };

  applyFilter = (d: any[], key: any, searchToProperty = this.filterOnProp, type: SearchType = 'includes') => {
    return type === 'includes'
      ? d.filter(e => String(extractingValue(e, this.whatPropType(searchToProperty))).toLowerCase().includes(String(key).toLowerCase()))
      : d.filter(e => String(extractingValue(e, this.whatPropType(searchToProperty))).toLowerCase() === String(key).toLowerCase());
  };

  asGroup = () => !(!this.formGroup || !this.formGroupName);

  constructor(@Optional() @Host() @SkipSelf()
              public controlContainer: ControlContainer,
              public cd: ChangeDetectorRef) { super(); }

  calculatingIndicator() {
    if (this.isEager()) {
      if (this.successOnFetch && !this.failOnFetch) {
        return false;
      } else {
        return true;
      }
    } else {
      if (this.failOnFetch) {
        return false;
      }

      if (this.typing) {
        return true;
      }
      return false;
    }
  }

  hasValue() {
    return String(extractingValue(this.asGroup() ? this.formGroup.value : this.getDisplayControl().value, this.displayProp)).length > 0;
  }

  isNativeInputEmpty() {
    if (this.input) {
      const v = String(this.input.nativeElement.value);
      return v.length === 0;
    } else {
      return true;
    }
  }

  contactingEndpoint(mode: AutoMode, key = '') {
    const currentCounter = this.counter;
    const obs = (<Function>this.targetOptions);
    setTimeout(() => {
      this.subs.push((<Observable<any[]>>obs(this.optionsParams)).subscribe(
        success => {
          if (currentCounter === this.counter) {
            if (!this.failOnFetch) {
              this.typing = false;
              this.successOnFetch = true;
              this.failOnFetch = false;

              let temp;
              if (this.isEager() || this.isInitially()) {
                this.initialized = true;
                this.originalData = this.transformFetchResult ? this.transformFetchResult(success) : success;
              } else {
                temp = this.transformFetchResult ? this.transformFetchResult(success) : success;
              }
              this.tempOptions = of(!this.withFilter ? this.applyFilter(this.isLazy() ? temp : this.originalData, key) : this.withFilter(this.isLazy() ? temp : this.originalData, key));
              this.cd.detectChanges();
            }
          }
        },
        failed => {
          this.typing = false;
          this.failOnFetch = true;
          this.successOnFetch = false;
          if (this.isEager()) {
            this.tempOptions = of([]);
          }
        }
      ));
    }, this.fakeDelay);
  }

  fetchingData(key: string = '') {

    if (isFunction(this.targetOptions)) {
      if (this.isEager()) {
        /* declare with delay call */
        if (!this.initialized) {
          this.contactingEndpoint(this.mode, key);
        } else {
          this.tempOptions = of(!this.withFilter ? this.applyFilter(this.originalData, key) : this.withFilter(this.originalData, key));
          this.cd.detectChanges();
        }
        /**/
      } else { /* LAZY */
        if (this.isLazy()) {
          this.contactingEndpoint(this.lazy, key);
        } else {
          if (!this.initialized) {
            this.contactingEndpoint(this.initially, key);
          } else {
            this.tempOptions = of(!this.withFilter ? this.applyFilter(this.originalData, key) : this.withFilter(this.originalData, key));
            this.cd.detectChanges();
          }
        }

      }
    } else if (isArray(this.targetOptions)) {
      if (this.isEager()) {

        /* declare with delay call */
        setTimeout(() => {
          this.tempOptions = of(!this.withFilter ? this.applyFilter(<any[]>this.targetOptions, key) : this.withFilter(<any[]>this.targetOptions, key));
          this.cd.detectChanges();
        }, this.fakeDelay);
        /**/
      }
    }
  }

  whenTyping($event: any) {
    /* */
    if ($event.ctrlKey && $event.key === 'Enter' || $event.key === 'Enter') {
      this.matAutoTrigger.closePanel();
      if (this.undoChanges) {
        this.undoChanges.complete();
      }
    }

    let value = this.getDisplayControl().value;
    value = String(value).trim();

    if (this.previousValue) {
      if (value === extractingValue(this.previousValue, this.displayProp)) {
        this.failOnFetch = false;
        if (this.initialized) {
          this.tempOptions = of(this.originalData);
        } else {
          this.tempOptions = of([]);
        }
        return;
      }
    }

    if (!this.typing && !this.initialized) {
      this.typing = true;
    }

    if (!this.isEager()) {
      if (String(value).trim().length === 0) {
        this.failOnFetch = false;
        this.typing = false;
        if (this.initialized) {
          this.tempOptions = of(this.originalData);
        } else {
          this.tempOptions = of([]);
        }
        return;
      }
    }

    /* hanya kana diterapakan jika */
    if (this.asGroup() && (value === undefined || this.filterOnProp === undefined)) {
        return;
    }

    this.readyToFetch(value);
  }

  readyToFetch(value = '') {
    if (!this.isEager()) {
      this.counter++;
      this.failOnFetch = false;
      this.successOnFetch = false;
    }

    let key = value;
    if (isArray(this.displayProp)) {
      key = extractingValue(value, (<any[]>this.displayProp));
    } else if (isObject(this.displayProp)) {
      key = extractingValue(value, (<PropDisplay>this.displayProp).api);
    } else if (isString(this.displayProp)) {
      key = extractingValue(value, (<string>this.displayProp));
    }

    this.fetchingData(key);
  }

  retry() {
    const value = this.getDisplayControl().value;
    this.typing = true;
    this.readyToFetch(value);
  }

  onSelected($event: MatAutocompleteSelectedEvent) {
    this.previousValue = $event.option.value;
    this.selectedMatOption = $event.option;
    this.patchFormGroup(this.formGroup, $event.option.value);
    this.typing = false;
    this.optionSelected.emit($event);
    // this.cd.detectChanges();
  }

  blur($event: any) {

    /* to handle changes on input, when they dont pick someone from list option */
    let subsToUndoChanges: Subscription;
    this.undoChanges = new BehaviorSubject(undefined);
    subsToUndoChanges = this.undoChanges.asObservable().subscribe(value => {}, error => {}, () => {
      if (subsToUndoChanges) {
        if (this.previousValue) {
          if (this.getDisplayControl().value !== extractingValue(this.previousValue, this.displayProp)) {
            this.getDisplayControl().patchValue(extractingValue(this.previousValue, this.displayProp));
          }
        } else {
          this.getDisplayControl().patchValue('');
        }

        // this.cd.detectChanges();
        subsToUndoChanges.unsubscribe();
      }
    });
  }

  clear() {
    this.resetFormGroup(this.formGroup);
    this.cleared = true;
    this.matAutoTrigger.closePanel();

    if (this.initialized) {
      this.tempOptions = of(this.originalData);
    } else {
      this.failOnFetch = true;
    }

    try {
      this.previousValue = undefined;
      this.input.nativeElement.blur();
      this.input.nativeElement.value = '';
      this.selectedMatOption.deselect();
    } catch (e) {}
  }


  opened() {
    if (this.cleared) {
      this.cleared = false;
      this.input.nativeElement.blur();
    }
  }

  returnControl(fg: FormGroup, display = this.displayProp) {
    if (!this.formGroup) {
      return new FormControl('');
    }

    if (isString(display)) {
      return <FormControl> fg.controls[<string>display];
    } else if (isArray(display)) {
      const arr = <string[]> display;

      if (arr.length === 0) {
        throw new Error('Display properti cannot empty');
      }

      if (arr.length === 1) {
        return <FormControl> fg.controls[arr[0]];
      } else {
        const ds = arr.length > 1 ? arr.shift() : [];
        const tempFg = <FormGroup> fg.controls[arr[0]]
        return this.returnControl(tempFg, ds);
      }
    } else if (isObject(display)) {
      const d = <PropDisplay> display;
      return <FormControl> fg.controls[d.local];
    }

    return undefined;
  }

  getFormGroupContainer() {
    return <FormGroup> this.controlContainer.control;
  }

  getDisplayControl(): FormControl {
    if (!this.formGroup || !this.formGroupName) {
      return this.formControlName ? (<FormControl>this.getFormGroupContainer().get(this.formControlName)) : this.formControl;
    } else if (!this.formControlName || !this.formControl) {
      return this.returnControl(this.formGroup, this.displayProp);
    } else {
      return new FormControl();
    }
  }

  getPkControl(): FormControl {
    if (!this.formGroup) {
      return new FormControl('');
    }

    let control: FormControl;
    if (isString(this.idProp)) {
      const prop = <string>this.idProp;
      control = (<FormControl>this.formGroup.controls[prop]);
    } else {
      const prop = <PropDisplay>this.idProp;
      control = (<FormControl>this.formGroup.controls[prop.local]);
    }

    return control;
  }

  ngOnInit() {
    /* check control name */
    if (this.formGroupName && this.formControlName) {
      throw new Error('formGroupName & formControlName cannot be declaring in the same time..');
      return;
    }

    if (this.formGroupName) {
      this.formGroup = <FormGroup>this.getFormGroupContainer().get(this.formGroupName);
      this.previousValue = this.formGroup.value;
    } else if (this.formControlName) {
      this.formControl = <FormControl>this.getFormGroupContainer().get(this.formControlName);
      this.previousValue = this.formControl.value;
    } else if (this.formGroup) {
      this.previousValue = this.formGroup.value;
    } else if (this.formControl) {
      this.previousValue = this.formControl.value;
    }

    if (this.disabled) {
      this.getDisplayControl().disable();
    }

    if (this.formGroup && this.formControl) {
      throw new Error('formGroup & formControl cannot be declaring in the same time..');
      return;
    }

    if (this.isEager()) {
      this.fetchingData();
    }

    this.cd.detectChanges();
  }

  ngAfterViewInit(): void {
    this.subs.push(this.matAutoTrigger.panelClosingActions.subscribe(value => {
      /* jika blur event yang didapat bukan berasal dari aksi ketika telah selesai memilih salah satu nilai dari list options */
      if (this.undoChanges) {
        this.undoChanges.complete();
      }
    }));


    // this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.subs = unsubscribes(this.subs);
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
  }

}
