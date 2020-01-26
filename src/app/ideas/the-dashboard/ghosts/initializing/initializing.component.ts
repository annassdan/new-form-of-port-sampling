import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-initializing',
  templateUrl: './initializing.component.html',
  styleUrls: ['./initializing.component.scss']
})
export class InitializingComponent implements OnInit {

  @Input() message = 'Menginisialisasi';

  constructor() { }

  ngOnInit() {
  }

}
