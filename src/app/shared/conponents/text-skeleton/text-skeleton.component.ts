import {AfterViewInit, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-text-skeleton',
  templateUrl: './text-skeleton.component.html',
  styleUrls: ['./text-skeleton.component.scss']
})
export class TextSkeletonComponent implements OnInit, AfterViewInit {

  @Input() message = '';

  @Input()
  top: string = '10px';

  @Input()
  background: string = '';

  @Input()
  start: string = '0px';

  @Input()
  besideOnNext: boolean = false;

  @Input()
  borderRadius: string = '0px';

  /* lebar skeleton element bisa dalam px maupun % */
  @Input()
  width: string = '';

  @Input()
  height: number = 20;

  @Input()
  heightAsPercent: boolean = false;

  @Input()
  theStyle = {};

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const padding = this.height / 2;
    const w = this.width.length === 0 ? '100%' : this.width;

    this.theStyle = {
      paddingTop: `${padding}${this.heightAsPercent ? '%' : 'px'}`,
      paddingBottom: `${padding}${this.heightAsPercent ? '%' : 'px'}`,
      width: w,
      borderRadius: this.borderRadius,
      display: 'flex',
      justifyContent: 'center',
      marginLeft: this.start,
      marginTop: this.besideOnNext ? '' : this.top,
      float: this.besideOnNext ? 'left' : '',
      backgroundColor: this.background.length === 0 ? '#d1d1d1' : this.background,
      ...this.theStyle,
    }
  }



}
