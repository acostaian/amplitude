import { Component, Input, OnInit } from '@angular/core';
import { VisualizerService } from 'src/app/services/visualizer-service/visualizer.service';
import { Strategy } from '../../visuals/Visualizers';
import visuals from '../../visuals/visuals';

@Component({
  selector: 'app-visuals-selector',
  templateUrl: './visuals-selector.component.html',
  styleUrls: ['./visuals-selector.component.css']
})
export class VisualsSelectorComponent implements OnInit {

  public visuals = Array.from(visuals);
  public selectedVisual: Strategy;
  
  private _visualizerService: VisualizerService;

  constructor(visualizerService: VisualizerService) {
    this._visualizerService = visualizerService;
    this.selectedVisual = this._visualizerService.selectedVisual;
  }

  ngOnInit(): void {
  }

  selectVisual(strategy: number) {
    this.selectedVisual = <Strategy>strategy;
    this._visualizerService.selectedVisual = <Strategy>strategy;
  }

}
