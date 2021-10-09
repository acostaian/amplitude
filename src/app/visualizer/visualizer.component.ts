import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { VisualizerService } from '../visualizer.service';
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

  @ViewChild('visualizercanvas') 
  private _visualizerCanvas: ElementRef<HTMLCanvasElement> | undefined;
  private _visualizerService: VisualizerService;
  private _audioService: AudioService;

  constructor(visualizerService: VisualizerService, audioService: AudioService) {
    this._visualizerService = visualizerService;
    this._audioService = audioService;
  }
  
  ngOnInit(): void { }

  async ngAfterViewInit(): Promise<void> {
    let canvas = this._visualizerCanvas?.nativeElement;

    try {
      if (canvas) {
        this._visualizerService.init();

        this.drawCanvas(
          canvas
        );
      }
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

  async drawCanvas(canvas: HTMLCanvasElement) {
    let drawVisual = requestAnimationFrame(() => this.drawCanvas(canvas));

    let data = await this._visualizerService.getData();
    
    let visualContext = new VisualContext(Strategy.BARSFREQ);

    visualContext.displayData(data, canvas);
  }

  sliderChanged = (value: number) => {
    let newFFT = Math.pow(2, value) * 1024;
    this._audioService.setFFT(newFFT);
  }

}
