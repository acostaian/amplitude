import { Injectable } from '@angular/core';
import AudioData from 'src/app/models/AudioData';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  public fftSize: number;
  private audioContext!: AudioContext;
  private streamSource!: MediaStreamAudioSourceNode;
  private channelSplitter!: ChannelSplitterNode;
  private mainAnalyser!: AnalyserNode;
  private secondaryAnalyser!: AnalyserNode;
  private contextInitialized: boolean = false;
  public isStereo = true;

  constructor() {
    this.fftSize = 2048;
  }
  
  private async init() {
    this.audioContext = new window.AudioContext();
    await this.initNodes();

    this.streamSource.connect(this.channelSplitter);
    this.channelSplitter.connect(this.mainAnalyser, 0);
    this.channelSplitter.connect(this.secondaryAnalyser, 1);

    this.contextInitialized = true;
  }

  private async initNodes() {
    this.mainAnalyser = new AnalyserNode(this.audioContext);
    this.mainAnalyser.fftSize = this.fftSize;
    this.secondaryAnalyser = new AnalyserNode(this.audioContext);
    this.secondaryAnalyser.fftSize = this.fftSize;
    this.streamSource = await this.createNavigatorSource();
    this.channelSplitter = this.audioContext.createChannelSplitter();
  }

  private async createNavigatorSource() {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        autoGainControl: false,
        channelCount: 2,
        echoCancellation: false,
        latency: 0,
        noiseSuppression: false,
        sampleRate: 48000,
        sampleSize: 16
      }
    });

    return this.audioContext.createMediaStreamSource(stream);
  }

  public async getAudioData(): Promise<AudioData> {
    if (this.audioContext && this.audioContext.state === 'running') {
      const bufferLength = this.mainAnalyser.frequencyBinCount;
      const audioData = new AudioData(bufferLength, this.isStereo);
  
      this.mainAnalyser.getByteFrequencyData(audioData.mainFrequencyData);
      this.secondaryAnalyser.getByteFrequencyData(audioData.secondaryFrequencyData);
      this.mainAnalyser.getByteTimeDomainData(audioData.mainTimeDomainData);
      this.secondaryAnalyser.getByteTimeDomainData(audioData.secondaryTimeDomainData);
  
      return audioData;
    } else {
      return new AudioData(0, false);
    }
  }

  play() {
    if (!this.contextInitialized) {
      this.init();
    }

    this.audioContext.resume();
  }

  pause() {
    this.audioContext.suspend();
  }

  public getFFT(): number {
    return this.fftSize;
  }

  public setFFT(value: number) {
    this.fftSize = value;
    this.mainAnalyser.fftSize = this.fftSize;
    this.secondaryAnalyser.fftSize = this.fftSize;
  }
  
}
