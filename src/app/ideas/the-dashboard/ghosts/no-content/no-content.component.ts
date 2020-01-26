import {Component, Input, OnInit} from '@angular/core';
import {MainStateService} from '../../../../shared/services/main-state.service';

@Component({
  selector: 'app-no-content',
  templateUrl: './no-content.component.html',
  styleUrls: ['./no-content.component.scss']
})
export class NoContentComponent implements OnInit {

  @Input() top = '25px';

  @Input() width = '350px';

  @Input() height = 350;

  @Input() bgColor;

  @Input() message = 'Tidak Ada Konten';

  @Input() messageStyle = {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#dedede'
  };

  constructor(public rootState: MainStateService) { }

  ngOnInit() {
  }

}
