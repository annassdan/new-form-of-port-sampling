import { Component } from '@angular/core';
import {SpesiesService} from "./services/master/spesies.service";
import {FormGroup} from "@angular/forms";
import {createFormGroup, createFormGroupContent} from "./shared/reactive-form-modeling";
import {hasilTangkapanPendaratan, pendaratan} from "./models/pendaratan/pendaratan";
import {generateUUID} from "./shared/utils";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  form: FormGroup;

  constructor(public spesiesService: SpesiesService) {
    this.form = createFormGroup(createFormGroupContent({...hasilTangkapanPendaratan, uuid: generateUUID()}));
  }

}
