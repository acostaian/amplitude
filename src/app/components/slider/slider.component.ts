import { Component, OnInit, Input } from '@angular/core';
import { AudioService } from '../../services/audio-service/audio.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  public value: number = 3;
  public displayedValue: number;

  private _audioService: AudioService;

  constructor(audioService: AudioService) {
    this._audioService = audioService;
    this.displayedValue = this._audioService.getFFT();
  }

  ngOnInit(): void {
  }

  onValueChanged = () => {
    let newFFT = Math.pow(2, this.value) * 256;
    this.displayedValue = newFFT;
    this._audioService.setFFT(newFFT);
  }

}
