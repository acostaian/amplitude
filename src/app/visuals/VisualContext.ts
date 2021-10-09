import { VisualStrategy } from './VisualStrategy';
import { Waveform } from './Waveform';
import Strategy from './Strategy';
import visuals from './visuals';

class VisualContext {

    private _selectedVisualStrategy: VisualStrategy;

    constructor(strategy: Strategy) {
        this._selectedVisualStrategy = visuals.get(strategy)?.visualStrategy ?? new Waveform();
    }

    public setVisualStrategy(strategy: Strategy) {
        this._selectedVisualStrategy = visuals.get(strategy)?.visualStrategy ?? new Waveform();
    }

    public displayData(data: Uint8Array, canvas: HTMLCanvasElement) {
        this._selectedVisualStrategy.display(data, canvas);
    }

}

export {
    VisualContext,
    Strategy
};