import {FormBuilder, Validators} from '@angular/forms';

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
  console.log(content)

  if (content) {
    const controls = Object.keys(content.initValue);
    controls.forEach(key => {
      const newFormGroup = (value = content.initValue[key], validator = content.initValidator[key], disable = content.initDisableStatus[key]) => createFormGroup(createFormGroupContent(value, validator, disable));
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




