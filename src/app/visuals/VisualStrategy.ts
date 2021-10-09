export interface VisualStrategy {
    display(data: Uint8Array, canvas: HTMLCanvasElement): void;
}
