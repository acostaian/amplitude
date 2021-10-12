import { Component, OnInit } from '@angular/core';
import { AudioService } from '../audio.service';

@Component({
  selector: 'app-visualizer-tools',
  templateUrl: './visualizer-tools.component.html',
  styleUrls: ['./visualizer-tools.component.css']
})
export class VisualizerToolsComponent implements OnInit {

  private _audioService: AudioService;

  constructor(audioService: AudioService) {
    this._audioService = audioService;
  }

  ngOnInit(): void {
  }

  sliderChanged = (value: number) => {
    let newFFT = Math.pow(2, value) * 1024;
    this._audioService.setFFT(newFFT);
  }

}
