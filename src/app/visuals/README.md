# Overview

The Strategy pattern lets you switch between different visualization algorithms at runtime without changing the code
that uses them.

## Key Components

### 1. `VisualStrategy` Interface

```
interface VisualStrategy {
    display(audioData: AudioData, canvas: HTMLCanvasElement): void;
}
```

This is the contract that all visualizers must follow. Each strategy implements this interface.

### 2. Concrete Strategies (`Visualizers`)

You have three different visualizer implementations:

- `Waveform`: Draws sine wave visualization using time domain data
- `Bar`: Draws bars mirrored vertically using time domain data
- `BarFreq`: Draws frequency bars from both sides horizontally

Each implements the `display()` method differently to create unique visual effects.

### 3. `Visual` Wrapper

Simple container that pairs a display name with a strategy instance.

### 4. Strategy Registry (`visuals`)

A Map that registers all available visualizers:

```
visuals.set(Strategy.WAVEFORM, new Visual('Sine Wave', new Waveform()));

visuals.set(Strategy.BARS, new Visual('Time Domain', new Bar()));

visuals.set(Strategy.BARSFREQ, new Visual('Frequency Domain', new BarFreq()));
```

### 5. `VisualContext`

The context that uses the strategies. It:
- Holds the currently selected strategy
- Lets you switch strategies at runtime via `setVisualStrategy()`
- Delegates the actual rendering to the current strategy via `displayData()`

How It Works

1. Create a VisualContext with a strategy enum (e.g., `Strategy.WAVEFORM`)
2. The context looks up the corresponding visualizer from the registry
3. Call `displayData(audioData, canvas)` on the context
4. The context delegates to the current strategy's `display()` method
5. Switch visualizers anytime with `setVisualStrategy(Strategy.BARS)`

This pattern makes it easy to add new visualizers without modifying existing code - just create a new class
implementing `VisualStrategy` and register it in the Map.
