import { Injectable } from '@angular/core';
import { AudioService } from './audio.service';

@Injectable({
  providedIn: 'root'
})
export class VisualizerService {

  private _audioService: AudioService;

  constructor(audioService: AudioService) {
    this._audioService = audioService;
  }

  init() {
    this._audioService.init();
  }

  async getData(): Promise<Uint8Array> {
    return await this._audioService.getStreamData();
  }
  
}
