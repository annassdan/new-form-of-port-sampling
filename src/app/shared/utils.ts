import {Subscription} from 'rxjs';
import {createNumberMask} from "text-mask-addons/dist/textMaskAddons";
import {
  TYPE_OF_ARRAY,
  TYPE_OF_BOOLEAN,
  TYPE_OF_FUNCTION,
  TYPE_OF_NUMBER,
  TYPE_OF_OBJECT,
  TYPE_OF_STRING
} from "./constants";
import {PropDisplay} from "./conponents/i-autocomplete/i-autocomplete.component";
import {ErrorStateMatcher} from "@angular/material/core";
import {FormControl, FormGroupDirective, NgForm} from "@angular/forms";

export function unsubscribes(subscribers: Subscription[]) {
  if (subscribers) {
    subscribers.forEach((sub: Subscription) => {
      try {
        sub.unsubscribe();
      } catch (e) {
        console.log('sub.unsubscribe() tidak dapat dilakukan...');
      }
    });
  }

  return [];
}



export function standardInputMask(prefix = '', suffix = '') {
  return {
    mask: createNumberMask({
      prefix: prefix,
      suffix: suffix,
      allowDecimal: true
    }),
    guide: false,
    placeholderChar: '\u2000'
  }
}

export const stringifyContext = (context) => ({}.toString.call(context));

export const isFunction = (context) => context && stringifyContext(context) === TYPE_OF_FUNCTION;

export const isArray = (context) => context && stringifyContext(context) === TYPE_OF_ARRAY;

export const isObject = (context) => context && stringifyContext(context) === TYPE_OF_OBJECT;

export const isString = (context) => context && stringifyContext(context) === TYPE_OF_STRING;

export const isNumber = (context) => context && stringifyContext(context) === TYPE_OF_NUMBER;

export const isBoolean = (context) => context && stringifyContext(context) === TYPE_OF_BOOLEAN;

// export type ArrayInArray = { [key: string]: ArrayInArray | string }[];

export function extractingValue(object: any, properties: PropDisplay | string[] | ((value, extra?) => any) | string) {
  if (object === undefined || object === null) {
    throw new Error('The object cannot be undefined/null');
  }

  if (isObject(object)) {
    if (isString(properties)) {
      return object[<string> properties];
    } else if (properties && isFunction(properties)) {
      object = (<(value, extra?) => any> properties)(object);
    } else if (properties && properties[0] && isString(properties[0])) {
      properties = <string[]> properties;
      for (const property of properties) {
        if (object[property] === undefined) {
          return '-';
        }
        object = object[property];
      }
    } else if (properties && properties[0] && isObject(properties[0])) {

    } else {
      throw new Error('Cannot be process...');
    }
  } else {
    if (isArray(object)) {

    }
  }

  return object;
}


export class IErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
