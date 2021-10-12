import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  public _fftSize: number;
  private _audioContext!: AudioContext;
  private _analyser!: AnalyserNode;
  private _streamSource!: MediaStreamAudioSourceNode;
  private _contextInitialized: boolean = false;

  constructor() {
    // This should be the only instance of AudioContext
    this._fftSize = 2048;
  }
  
  public async init() {
    this._audioContext = new window.AudioContext();
    this._analyser = new AnalyserNode(this._audioContext);
    this._analyser.fftSize = this._fftSize;

    // Obtain media stream through the navigator
    let stream = await navigator.mediaDevices.getUserMedia({
      audio: true
    });

    this._streamSource = this._audioContext.createMediaStreamSource(stream);

    // this._streamSource.connect(this._audioContext.destination);
    this._streamSource.connect(this._analyser);

    this._contextInitialized = true;
  }

  public async getFrequencyData(): Promise<Uint8Array> {
    if (this._audioContext && this._audioContext.state === 'running') {
      const bufferLength = this._analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
  
      this._analyser.getByteFrequencyData(dataArray);
  
      return dataArray;
    } else {
      return new Uint8Array();
    }
  }

  public async getTimeDomainData(): Promise<Uint8Array> {
    if (this._audioContext && this._audioContext.state === 'running') {
      const bufferLength = this._analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
  
      this._analyser.getByteTimeDomainData(dataArray);
  
      return dataArray;
    } else {
      return new Uint8Array();
    }
  }

  play() {
    if (!this._contextInitialized) {
      this.init();
    }

    this._audioContext.resume();
  }

  pause() {
    this._audioContext.suspend();
  }

  public getFFT(): number {
    return this._fftSize;
  }

  public setFFT(value: number) {
    this._fftSize = value;
    this._analyser.fftSize = this._fftSize;
  }
  
}
