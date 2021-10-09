import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private _fftSize: number;
  private _audioContext: AudioContext;
  private _analyser: AnalyserNode;

  constructor() {
    // This should be the only instance of AudioContext
    this._fftSize = 2048;
    this._audioContext = new window.AudioContext();
    this._analyser = new AnalyserNode(this._audioContext);
    this._analyser.fftSize = this._fftSize;
  }

  public async init() {
    // Obtain media stream through the navigator
    let stream = await navigator.mediaDevices.getUserMedia({
      audio: true
    });

    let streamSource = this._audioContext.createMediaStreamSource(stream);

    // streamSource.connect(this._audioContext.destination);
    streamSource.connect(this._analyser);
  }

  public async getStreamData(): Promise<Uint8Array> {
    const bufferLength = this._analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // this._analyser.getByteTimeDomainData(dataArray);
    this._analyser.getByteFrequencyData(dataArray);

    return dataArray;
  }

  public setFFT(value: number) {
    this._fftSize = value;
    this._analyser.fftSize = this._fftSize;
  }
  
}
