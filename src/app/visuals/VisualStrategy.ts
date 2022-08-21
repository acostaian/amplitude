import AudioData from "../models/AudioData";

export interface VisualStrategy {
    display(audioData: AudioData, canvas: HTMLCanvasElement): void;
}
