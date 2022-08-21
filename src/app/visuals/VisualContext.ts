import { VisualStrategy } from './VisualStrategy';
import { Strategy, Waveform } from './Visualizers';
import visuals from './visuals';
import AudioData from '../models/AudioData';

class VisualContext {

    private _selectedVisualStrategy: VisualStrategy;

    constructor(strategy: Strategy) {
        this._selectedVisualStrategy = visuals.get(strategy)?.visualStrategy ?? new Waveform();
    }

    public setVisualStrategy(strategy: Strategy) {
        this._selectedVisualStrategy = visuals.get(strategy)?.visualStrategy ?? new Waveform();
    }

    public displayData(audioData: AudioData, canvas: HTMLCanvasElement) {
        this._selectedVisualStrategy.display(audioData, canvas);
    }

}

export {
    VisualContext,
    Strategy
};