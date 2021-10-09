import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { AudioService } from '../audio.service';
import { VisualContext } from '../visuals/VisualContext';
import Strategy from '../visuals/Strategy';


@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css']
})
export class VisualizerComponent implements OnInit, AfterViewInit {

  public width: number = window.innerWidth;
  public height: number = window.innerHeight;

  @ViewChild('visualizercanvas') 
  private visualizerCanvas: ElementRef<HTMLCanvasElement> | undefined;
  private audioService: AudioService;
  public fft: number;  

  constructor(audioService: AudioService) {
    this.audioService = audioService;
    this.fft = 2048;
  }
  
  ngOnInit(): void { }

  async ngAfterViewInit(): Promise<void> {
    let canvas = this.visualizerCanvas?.nativeElement;

    try {
      if (canvas) {
        this.audioService.init();

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

    let data = await this.audioService.getStreamData();
    
    let visualContext = new VisualContext(Strategy.BARS);

    visualContext.displayData(data, canvas);
  }

  sliderChanged = (value: number) => {
    let newFFT = Math.pow(2, value) * 1024;
    this.fft = newFFT
    this.audioService.setFFT(this.fft);
  }

}
