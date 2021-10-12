import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
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
  private _audioService: AudioService;
  private _selectedVisual: Strategy = Strategy.BARSFREQ;

  constructor(audioService: AudioService) {
    this._audioService = audioService;
  }
  
  ngOnInit(): void { }

  async ngAfterViewInit(): Promise<void> {
    let canvas = this._visualizerCanvas?.nativeElement;

    try {
      if (canvas) {
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

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    
    let visualContext = new VisualContext(this._selectedVisual);
    
    let data = {
      timeDomain: await this._audioService.getTimeDomainData(),
      frequency: await this._audioService.getFrequencyData()
    };

    visualContext.displayData(data, canvas);
  }

  visualChanged = (newVisual: Strategy) => {
    this._selectedVisual = newVisual;
  }
  
}
