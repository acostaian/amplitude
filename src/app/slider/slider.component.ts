import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  public value: number = 1;
  @Input() 
  public displayedValue: number = 0;
  @Input() 
  public onValueChanged = (value: number) => {};

  constructor() { }

  ngOnInit(): void {
  }

}
