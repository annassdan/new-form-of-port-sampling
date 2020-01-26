import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {extractingValue, isBoolean, isNumber, isString} from "./utils";

/**
 * Melakukan cast data ke Tipe Array
 * @param array target data yang kana di cast ke array
 */
function asArray<T>(array: any): T[] {
  return <T[]> array;
}

/**
 * Mengecek apakah objek berisikan nilai array atau tidak
 * @param array target objek
 */
function isArray(array: any): boolean {
  return array && typeof array === 'object' ? (<any[]> array).length !== undefined : false;
}

/**
 * Melakukan pengecekan apakah objek merupakan objek class atau bukan
 * @param object target
 */
function isObject(object: any): boolean {
  return object === undefined || object === null ? false : ((<any[]> object).length === undefined && typeof object === 'object');
}


/* model constant dari default nilai pada setiap formControl */
export const formControlContent = {
  value: '',
  disableStatus: false,
  validator: Validators.nullValidator
};

/* model constant dari inputan pembuatan form group secara ototmatis */
export const formGroupContent = {
  initValue: {},
  initDisableStatus: {},
  initValidator: {}
};
export type FormGroupContent = typeof formGroupContent;


/**
 * Untuk melakukan generate data-data yang dibutuhkan untuk membuat sebuah from group
 * berdasarkan data model constant
 * @param objectPredicate root level dari sebuah objek model constant
 * @param objectInit init yang diambil dari object setiap level dari @param objectPredicate
 * @param eachPropertyDefault nilai default yang akan diterapkan jika proses generate menemukan nilai undefined atau null
 */
function createContent<T>(objectPredicate: any,
                          objectInit: any,
                          eachPropertyDefault: any) {
  let content = {};
  const keys = Object.keys(objectPredicate);

  keys.forEach(key => {
    const value = (init = objectInit, epd = eachPropertyDefault) => (init && init[key] ? init[key] : epd);
    content = {
      ...content,
      [key]: (
        /* jika model properti merupakan objek */
        isObject(objectPredicate[key]) ? createContent(objectPredicate[key], value(), eachPropertyDefault) :
          ( /* jika model properti merupakan array */
            isArray(objectPredicate[key]) ? (asArray(objectPredicate[key])
                .map((predicate, index) => createContent(predicate, isArray(value(objectInit)) ? value(objectInit)[index] : value(), eachPropertyDefault))) :
              /* selain dari yang diatas */
              value()
          )
      )
    };
  });

  return content;
}

/**
 * Melakukan generate data parameter yang dibutuhkan untuk pembuatan form group secara otomatis
 * @param initValue nilai awal yang akan diterapkan disetiap form control dalam from group
 * @param initValidator nilai validator yang akan diterapkan disetiap form control dalam from group
 * @param initDisableStatus status disable/enable component form control dalam from group
 */
export function createFormGroupContent(initValue: any,
                                       initValidator?: any,
                                       initDisableStatus?: any) : FormGroupContent {
  const init = initValue ? initValue : {};
  return {
    initValue: init,
    initDisableStatus: createContent(init, initDisableStatus, formControlContent.disableStatus),
    initValidator: createContent(init, initValidator, formControlContent.validator),
  };
}

/**
 * Melakukan generate otomatis untuk sebuah form group
 * @param content paramater
 */
export function createFormGroup(content: FormGroupContent) {
  let controlsConfiguration = {};
  if (content) {
    const controls = Object.keys(content.initValue);
    controls.forEach(key => {
      const newFormGroup = (value = content.initValue[key], validator = content.initValidator[key], disable = content.initDisableStatus[key]) =>
        createFormGroup(createFormGroupContent(value, validator, disable));

      controlsConfiguration = {
        ...controlsConfiguration,
        [key]: (
          /* jika control merupakan form group */
          isObject(content.initValue[key]) ? newFormGroup() :
            ( /* jika control merupakan array */
              isArray(content.initValue[key]) ? new FormBuilder().array(asArray(content.initValue[key])
                  .map((init, index) => newFormGroup(init, asArray(content.initValidator[key])[index], asArray(content.initDisableStatus[key])[index]))) :
                /* selain dari yang diatas */
                createFormControl(content.initValue[key], content.initDisableStatus[key], content.initValidator[key])
            )
        )
      };
    });
  }

  return new FormBuilder().group(controlsConfiguration);
}

/**
 * Melakukan generate untuk parameter-parameter dasar yang diutuhkan oleh sebuah form control
 * @param value nilai
 * @param disableStatus status disable/enable component form control
 * @param validator otentikasi valid/invalid dari sebuah component form control
 * @param defaultContent nilai default yang akan  diterapkan jika pada proses ini menemukan nilai undefined atau null
 */
export function createFormControl(value: any,
                                  disableStatus: boolean,
                                  validator: Function | any,
                                  defaultContent = formControlContent): any[] {
  return [
    {
      value: value ? value : defaultContent.value,
      disabled: disableStatus ? disableStatus : defaultContent.disableStatus
    },
    validator ? validator : defaultContent.validator
  ];
}


export function isFormControlEmpty(control: string, formGroup: FormGroup | any) {
  const value = formGroup ? (<FormControl> formGroup.get(control)).value : '';
  return String(value).trim().length === 0;
}


export function extractFormControlValue(control: string, formGroup: FormGroup | any, defaultValue = '') {
  const value = formGroup ? (<FormControl> formGroup.get(control)).value : defaultValue;

  if (value) {
    return String(value).trim().length === 0 ? defaultValue : value;
  } else {
    return defaultValue;
  }
}


export function extractAllMemberOfFormArray(fg: FormGroup | any, formArrayControlName: string) {
  return fg ? ((<FormArray>  fg.get(formArrayControlName)).controls) : [];
}

export async function addFormArrayMember(formGroupParent: FormGroup, formArrayControlName: string, data: FormGroup, first = false) {
  const formArray = extractFormArray(formGroupParent, formArrayControlName);
  if (first) {
    await formArray.insert(0, data);
  } else {
    await formArray.push(data);
  }
}

export async function removeFormArrayMember(formGroupParent: FormGroup, formArrayControlName: string, index: number) {
  const formArray = extractFormArray(formGroupParent, formArrayControlName);
  await formArray.removeAt(index);
}

export function patchFormGroup(formGroup: FormGroup, patchValue: any) {
  if (formGroup) {
    for (const control in formGroup.controls) {
      if (formGroup.controls[control] instanceof FormGroup) {
        patchFormGroup((<FormGroup>formGroup.controls[control]), extractingValue(patchValue, control));
      } else if (formGroup.controls[control] instanceof FormArray) {
        const fa = <FormArray>formGroup.controls[control];
        for (const fb of fa.controls) {
          patchFormGroup(<FormGroup>fb, extractingValue(patchValue, control));
        }
      } else if (formGroup.controls[control] instanceof FormControl) {
        const formControl = <FormControl>formGroup.controls[control];
        formControl.patchValue(extractingValue(patchValue, control));
      }
    }
  }
}

export function resetFormGroup(fg: FormGroup, asString = false) {
  if (fg) {
    for (const control in fg.controls) {
      if (fg.controls[control] instanceof FormGroup) {
        resetFormGroup(<FormGroup>fg.controls[control]);
      } else if (fg.controls[control] instanceof FormArray) {
        const fa = <FormArray>fg.controls[control];
        for (const fb of fa.controls) {
          resetFormGroup(<FormGroup>fb);
        }
      } else if (fg.controls[control] instanceof FormControl) {
        const fc = (<FormControl>fg.controls[control]);
        if (isString(fc.value)) {
          fc.patchValue('');
        } else if (isNumber(fc.value)) {
          fc.patchValue(asString ? '' : 0);
        } else if (isBoolean(fc.value)) {
          fc.patchValue(false);
        }
      }
    }
  }
}

export const extractFormGroup = (fg: FormGroup, control: string) => (<FormGroup> fg.controls[control]);
export const extractFormArray = (fg: FormGroup, control: string) => (<FormArray> fg.controls[control]);
export const extractFormControl = (fg: FormGroup, control: string) => (<FormControl> fg.controls[control]);

