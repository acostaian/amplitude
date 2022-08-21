import { Injectable } from '@angular/core';
import { AudioService } from '../audio-service/audio.service';
import { Strategy, VisualContext } from '../../visuals/VisualContext';

@Injectable({
  providedIn: 'root'
})
export class VisualizerService {

  public selectedVisual: Strategy = Strategy.BARSFREQ;
  private _audioService: AudioService;

  constructor(audioService: AudioService) {
    this._audioService = audioService;
  }
  
  public async drawCanvas(canvas: HTMLCanvasElement) {
    let visualContext = new VisualContext(this.selectedVisual);

    try {
      const audioData = await this._audioService.getAudioData()
  
      visualContext.displayData(audioData, canvas);
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

}
