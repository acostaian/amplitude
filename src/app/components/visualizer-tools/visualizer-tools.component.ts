import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visualizer-tools',
  templateUrl: './visualizer-tools.component.html',
  styleUrls: ['./visualizer-tools.component.css']
})
export class VisualizerToolsComponent implements OnInit {

  public toolsNavClass: string = 'visualizer-nav';
  public toolsArrowClass: string = 'visualizer-tools-arrow visualizer-tools-arrow-normal';

  private _toolsShown: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  showTools() {
    this._toolsShown = !this._toolsShown;

    this.toolsNavClass = this._toolsShown ? 'visualizer-nav' : 'visualizer-nav visualizer-nav-hidden';
    this.toolsArrowClass = this._toolsShown ? 'visualizer-tools-arrow visualizer-tools-arrow-normal' : 'visualizer-tools-arrow visualizer-tools-arrow-inverse';
  }

}
