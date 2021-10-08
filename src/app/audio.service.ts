import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private audioContext: AudioContext;
  private analyser: AnalyserNode;

  constructor() {
    // This should be the only instance of AudioContext
    this.audioContext = new window.AudioContext();
    this.analyser = new AnalyserNode(this.audioContext);
    this.analyser.fftSize = 2048;
  }

  public async init() {
    // Obtain media stream through the navigator
    let stream = await navigator.mediaDevices.getUserMedia({
      audio: true
    });

    let streamSource = this.audioContext.createMediaStreamSource(stream);

    // streamSource.connect(this.audioContext.destination);
    streamSource.connect(this.analyser);
  }

  async getStreamData(): Promise<Uint8Array> {
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    this.analyser.getByteTimeDomainData(dataArray);

    return dataArray;
  }
}
