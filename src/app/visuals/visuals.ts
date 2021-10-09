import { Visual } from './Visual';
import { Waveform } from './Waveform';
import { Bar } from './Bar';
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
        'Frequency Bar',
        new Bar()
    )
);

export default visuals;