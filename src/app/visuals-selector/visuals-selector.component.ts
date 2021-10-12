import { Component, Input, OnInit } from '@angular/core';
import { Strategy } from '../visuals/Visualizers';
import visuals from '../visuals/visuals';

@Component({
  selector: 'app-visuals-selector',
  templateUrl: './visuals-selector.component.html',
  styleUrls: ['./visuals-selector.component.css']
})
export class VisualsSelectorComponent implements OnInit {

  public visuals = Array.from(visuals);
  @Input()
  public selectedVisual!: Strategy;
  @Input()
  public onVisualChanged: (newVisual: Strategy) => void = () => {};

  constructor() { }

  ngOnInit(): void {
  }

  selectVisual(i: number) {
    this.onVisualChanged(this.visuals[i][0]);
  }

}
