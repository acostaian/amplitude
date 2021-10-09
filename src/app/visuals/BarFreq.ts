import { VisualStrategy } from './VisualStrategy';

export class BarFreq implements VisualStrategy {
    display(data: Uint8Array, canvas: HTMLCanvasElement) {
        let canvasCtx = canvas?.getContext('2d');

        if (canvasCtx) {
            const WIDTH = canvas.width;
            const HEIGHT = canvas.height;

            canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

            // Background
            canvasCtx.fillStyle = 'rgb(0, 0, 0)';
            canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

            // Bar
            let barWidth = (WIDTH / data.length);
            let barHeight;
            let x = 0;

            // Draw each bar
            for (let i = 0; i < data.length; i++) {
                barHeight = data[i] * 3;

                let color = barHeight + 100;
                canvasCtx.fillStyle = 'rgb(255, 255, 255)';
                canvasCtx.fillRect(x, HEIGHT, barWidth, -barHeight);

                x += barWidth + 0.1;
            }
        }
    }
}