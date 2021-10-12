import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { AudioService } from '../audio.service';
import { Strategy, VisualContext } from '../visuals/VisualContext';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css']
})
export class VisualizerComponent implements OnInit, AfterViewInit {

  public width: number = window.innerWidth;
  public height: number = window.innerHeight;
  public selectedVisual: Strategy = Strategy.BARSFREQ;

  @ViewChild('visualizercanvas') 
  private _visualizerCanvas: ElementRef<HTMLCanvasElement> | undefined;
  private _audioService: AudioService;
  private _canvas!: HTMLCanvasElement;

  @HostListener('window:resize')
  onWindowResize() {
    if (this._canvas) {
      this.refreshData();
    }
  }

  constructor(audioService: AudioService) {
    this._audioService = audioService;
  }
  
  ngOnInit(): void { }

  async ngAfterViewInit(): Promise<void> {
    let canvas = this._visualizerCanvas?.nativeElement;

    if (canvas) {
      this._canvas = canvas;
      this.drawCanvas();
    }
  }

  async drawCanvas() {
    let drawVisual = requestAnimationFrame(() => this.drawCanvas());

    await this.refreshData();
  }

  async refreshData() {
    try {

      this.width = window.innerWidth;
      this.height = window.innerHeight;
      
      let visualContext = new VisualContext(this.selectedVisual);
      
      let data = {
        timeDomain: await this._audioService.getTimeDomainData(),
        frequency: await this._audioService.getFrequencyData()
      };
  
      visualContext.displayData(data, this._canvas);

    } catch (error) {
      if (error instanceof DOMException) {
        // If the user denies access or the device is unavailable
        if (error.name === 'NotAllowedError' || error.name === 'NotFoundError') {
          console.error('Media denied or not available.');
        }
      } else {
        console.error('Unknown error.');
      }
    }
  }

  visualChanged = (newVisual: Strategy) => {
    this.selectedVisual = newVisual;
  }
  
}
