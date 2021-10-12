export interface VisualStrategy {
    display(data: { timeDomain: Uint8Array, frequency: Uint8Array }, canvas: HTMLCanvasElement): void;
}
