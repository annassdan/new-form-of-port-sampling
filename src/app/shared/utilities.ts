import {extractingValue, standardInputMask} from "./utils";
import {
  extractFormArray,
  extractFormControl,
  extractFormControlValue,
  extractFormGroup,
  isFormControlEmpty, patchFormGroup, resetFormGroup
} from "./reactive-form-modeling";


export class Utilities {

  standardInputMask = standardInputMask;

  extractFormControlValue = extractFormControlValue;

  isFormControlEmpty = isFormControlEmpty;

  extractFormGroup = extractFormGroup;

  extractFormArray = extractFormArray;

  extractFormControl = extractFormControl;

  extractingValue = extractingValue;

  resetFormGroup = resetFormGroup;

  patchFormGroup = patchFormGroup;


  constructor() {
  }
}
