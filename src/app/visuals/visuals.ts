import { Visual } from './Visual';
import { Strategy, Bar, BarFreq, Waveform } from './Visualizers';

const visuals = new Map<Strategy, Visual>();

visuals.set(
    Strategy.WAVEFORM,
    new Visual(
        'Waveform',
        new Waveform()
    )
);

visuals.set(
    Strategy.BARS,
    new Visual(
        'Bars Domain',
        new Bar()
    )
);

visuals.set(
    Strategy.BARSFREQ,
    new Visual(
        'Frequency Bar',
        new BarFreq()
    )
);

export default visuals;