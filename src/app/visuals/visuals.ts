import { Visual } from './Visual';
import { Waveform } from './Waveform';
import { Bar } from './Bar';
import { BarFreq } from './BarFreq';
import Strategy from './Strategy';

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