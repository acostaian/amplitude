import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { AudioService } from '../audio.service';

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

  constructor(audioService: AudioService) {
    this.audioService = audioService;
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
    let canvasCtx = canvas?.getContext('2d');

    let drawVisual = requestAnimationFrame(() => this.drawCanvas(canvas));

    let data = await this.audioService.getStreamData();

    // const WIDTH = canvas.width;
    // const HEIGHT = canvas.height;

    const WIDTH = this.width;
    const HEIGHT = this.height;
    
    if (canvasCtx) {
      canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
      
      // Background
      canvasCtx.fillStyle = 'rgb(0, 0, 0)';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
  
      // Line
      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = 'rgb(255, 255, 255)';
      canvasCtx.beginPath();
  
      const sliceWidth = WIDTH * 1.0 / data.length; // data.length * 2?
      let x = 0;
  
      for(var i = 0; i < data.length; i++) {
  
        const v = data[i] / 128.0;
        const y = v * HEIGHT / 2;
  
        if(i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }
  
        x += sliceWidth;
      }
  
      canvasCtx.lineTo(WIDTH, HEIGHT / 2);
      canvasCtx.stroke();
    }
  }

}
