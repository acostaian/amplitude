import { Component, OnInit } from '@angular/core';
import { AudioService } from '../../services/audio-service/audio.service';

@Component({
  selector: 'app-mute-button',
  templateUrl: './mute-button.component.html',
  styleUrls: ['./mute-button.component.css']
})
export class MuteButtonComponent implements OnInit {

  private _audioService: AudioService;
  private _isAudioMuted: boolean = true;
  public micIcon: string = 'mic_off';

  constructor(audioService: AudioService) {
    this._audioService = audioService;
  }

  ngOnInit(): void {
  }

  onMuteClick() {
    this._isAudioMuted = !this._isAudioMuted;
    this.micIcon = this._isAudioMuted ? 'mic_off' : 'mic';

    if (this._isAudioMuted) {
      this._audioService.pause();
    } else {
      this._audioService.play();
    }
  }

}
