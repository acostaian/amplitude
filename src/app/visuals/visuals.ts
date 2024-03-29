import { Visual } from './Visual';
import { Strategy, Bar, BarFreq, Waveform } from './Visualizers';

const visuals = new Map<Strategy, Visual>();

visuals.set(
    Strategy.WAVEFORM,
    new Visual(
        'Sine Wave',
        new Waveform()
    )
);

visuals.set(
    Strategy.BARS,
    new Visual(
        'Time Domain',
        new Bar()
    )
);

visuals.set(
    Strategy.BARSFREQ,
    new Visual(
        'Frequency Domain',
        new BarFreq()
    )
);

export default visuals;