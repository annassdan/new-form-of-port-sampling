import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Host,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  SkipSelf,
  ViewChild
} from '@angular/core';
import {ControlContainer, FormArray, FormControl, FormGroup} from "@angular/forms";
import {MatAutocompleteSelectedEvent, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {extractingValue, isArray, isFunction, isObject, isString, unsubscribes} from "../../utils";
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
  styleUrls: ['./i-autocomplete.component.scss']
})
export class IAutocompleteComponent extends Utilities implements OnInit, OnDestroy, AfterViewInit {

  fakeDelay = 1000;

  /* digunakan sebagai counter parameter untuk set data temporary di options */
  private counter = -1;

  /* ketika user mulai melakukan typing */
  private typing = false;

  private failOnFetch = false;

  private successOnFetch = false;

  private initialized = false;

  private subs: Subscription[] = [];

  @Input() mode: AutoMode = 'eager';

  @Input() appearance: MatFormFieldAppearance;

  /* Progress loading indikator ketika proses pencarian/filtering dilakukan pada autocomplete */
  @Input() useProgress = false;

  @Input() formGroup: FormGroup;

  @Input() formGroupName: string;


  @Input() clearButton = true;

  /* untuk mengindikasikan bahwa tombol clear telah ditekan */
  private cleared = false;

  /* List data yang akan digunakan sebagai data dasar untuk ditampilkan di option */
  @Input() targetOptions: { [key: string]: any }[] | Function;

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

  @Input() displayProp: PropDisplay | string[] | string = [];

  @Input() idProp: string | PropDisplay = PK_COLUMN;

  @Input() filterOnProp: PropDisplay | string[] | string = [];

  /* when enter, move to next element */
  @Input() nextTo;

  /* when Ctrl + enter, move to previous element */
  @Input() previousTo;

  @ViewChild('autoInput', {static: false}) input: ElementRef<HTMLInputElement>;

  @ViewChild(MatAutocompleteTrigger, {static: false}) matAutoTrigger: MatAutocompleteTrigger;

  /* jika arraynya kosong, maka diasumsikan akan berpengaruh ke semua properti yang ada pada formgroup */
  // @Input() affectedTo: ( PropDisplay | string)[] = [];

  // @Output() optionSelected = new EventEmitter<MatAutocompleteSelectedEvent>();


  private undoChanges: Subject<any>;

  // previousValue;

  selectedMatOption: MatOption;


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

  isEager = () => this.mode === 'eager';

  isLazy = () => this.mode === 'lazy';

  constructor(@Optional() @Host() @SkipSelf()
              private controlContainer: ControlContainer,
              private cd: ChangeDetectorRef) {
    super();

  }

  calculatingIndicator() {
    if (this.isEager()) {
      if (this.successOnFetch && !this.failOnFetch) {
        return false;
      } else {
        return true;
      }
    } else {
      if (this.typing) {
        return true;
      }

      return false;
    }
  }

  hasValue() {
    const value = this.formGroup.value;
    return String(extractingValue(value, this.displayProp)).length > 0;
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
            this.typing = false;
            this.successOnFetch = true;
            this.failOnFetch = false;

            let temp;
            if (mode === 'eager' || mode === 'initially') {
              this.initialized = true;
              // console.log('this.initialized', this.initialized)
              this.originalData = this.transformFetchResult ? this.transformFetchResult(success) : success;
            } else {
              temp = this.transformFetchResult ? this.transformFetchResult(success) : success;
            }

            this.tempOptions = of(this.applyFilter(mode === 'lazy' ? temp : this.originalData, key));
            this.cd.detectChanges();
          }
        },
        failed => {
          this.typing = false;
          this.failOnFetch = true;
          this.successOnFetch = false;
          if (mode === 'eager') {
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
          this.tempOptions = of(this.applyFilter(this.originalData, key));
          this.cd.detectChanges();
        }
        /**/
      } else { /* LAZY */

        if (this.isLazy()) {
          this.contactingEndpoint('lazy', key);
        } else {
          if (!this.initialized) {
            this.contactingEndpoint('initially', key);
          } else {
            this.tempOptions = of(this.applyFilter(this.originalData, key));
            this.cd.detectChanges();
          }
        }

      }
    } else if (isArray(this.targetOptions)) {
      if (this.isEager) {

        /* declare with delay call */
        setTimeout(() => {
          this.tempOptions = of(this.applyFilter(<any[]>this.targetOptions, key));
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
      this.undoChanges.complete();
    }

    let value = $event.srcElement.value;
    value = String(value).trim();
    const v = this.formGroup.value;
    if (value === extractingValue(v, this.displayProp)) {
      this.failOnFetch = false;
      if (this.initialized) {
        this.tempOptions = of(this.originalData);
      } else {
        this.tempOptions = of([]);
      }
      return;
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

    //
    if (value === undefined || this.filterOnProp === undefined) {
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

    let key = EMPTY;
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
    const value = this.input.nativeElement.value;
    this.typing = true;

    this.readyToFetch(value);
  }

  onSelected($event: MatAutocompleteSelectedEvent) {
    // console.log('selected...')
    // this.previousValue = $event.option.value;
    this.selectedMatOption = $event.option;
    this.patchFormGroup(this.formGroup, $event.option.value);
    // this.formGroup.patchValue($event.option.value);
    this.typing = false;
  }

  blur($event: any) {

    /* to handle changes on input, when they dont pick someone from list option */
    let subsToUndoChanges: Subscription;
    this.undoChanges = new BehaviorSubject(undefined);
    subsToUndoChanges = this.undoChanges.asObservable().subscribe(value => {
    }, error => {
    }, () => {
      if (subsToUndoChanges) {
        const currentTextDisplayed = String(this.input.nativeElement.value).trim();
        const realTextDisplayed = String(extractingValue(this.formGroup.value, this.displayProp));
        if (currentTextDisplayed !== realTextDisplayed) {
          // console.log('must be undo');
          this.input.nativeElement.value = realTextDisplayed;
        }

        subsToUndoChanges.unsubscribe();
      }
    });

    // console.log('blur')
  }

  clear() {
    // console.log('clear...');
    this.resetFormGroup();
    this.cleared = true;
    this.matAutoTrigger.closePanel();

    if (this.initialized) {
      this.tempOptions = of(this.originalData);
    }

    this.selectedMatOption.deselect();
    this.input.nativeElement.blur();
    this.input.nativeElement.value = '';

  }



  opened() {
    // console.log('opened')
    if (this.cleared) {
      this.cleared = false;
      this.input.nativeElement.blur();
    }
  }


  ngOnInit() {
    if (this.formGroupName) {
      this.formGroup = <FormGroup>this.controlContainer.control.get(this.formGroupName);
    }

    // if (this.formGroup) {
    //   this.previousValue = this.formGroup.value;
    // }

    if (this.mode === 'eager') {
      this.fetchingData();
    }
  }

  ngAfterViewInit(): void {
    if (this.formGroup) {
      this.input.nativeElement.value = extractingValue(this.formGroup.value, this.displayProp);
    }

    this.subs.push(this.matAutoTrigger.panelClosingActions.subscribe(value => {
      /* jika blur event yang didapat bukan berasal dari aksi ketika telah selesai memilih salah satu nilai dari list options */
      if (this.undoChanges) {
        this.undoChanges.complete();
      }
    }));
  }

  ngOnDestroy(): void {
    this.subs = unsubscribes(this.subs);
  }


}
