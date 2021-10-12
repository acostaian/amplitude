import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { VisualizerService } from '../../services/visualizer-service/visualizer.service';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css']
})
export class VisualizerComponent implements OnInit, AfterViewInit {

  public width: number = window.innerWidth;
  public height: number = window.innerHeight;

  @ViewChild('visualizercanvas') 
  private _visualizerCanvas: ElementRef<HTMLCanvasElement> | undefined;
  private _canvas!: HTMLCanvasElement;
  private _visualizerService: VisualizerService;

  constructor(visualizerService: VisualizerService) {
    this._visualizerService = visualizerService;
  }
  
  ngOnInit(): void { }

  async ngAfterViewInit(): Promise<void> {
    let canvas = this._visualizerCanvas?.nativeElement;

    if (canvas) {
      this._canvas = canvas;
      this.initDrawLoop();
    }
  }

  @HostListener('window:resize')
  onWindowResize() {
    if (this._canvas) {
      this.refreshData();
    }
  }

  async initDrawLoop() {
    requestAnimationFrame(() => this.initDrawLoop());
    await this.refreshData();
  }

  async refreshData() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    
    await this._visualizerService.drawCanvas(this._canvas);
  }
  
}
