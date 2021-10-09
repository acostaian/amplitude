import { Component, OnInit, Input } from '@angular/core';
import { AudioService } from '../audio.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  public value: number = 1;
  public displayedValue: number;
  @Input() 
  public updateFFT = (value: number) => {};

  private _audioService: AudioService;

  constructor(audioService: AudioService) {
    this._audioService = audioService;
    this.displayedValue = this._audioService.getFFT();
  }

  ngOnInit(): void {
  }

  onValueChanged(value: number) {
    this.updateFFT(value);
    this.displayedValue = this._audioService.getFFT();
  }

}
