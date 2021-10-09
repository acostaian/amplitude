import { VisualStrategy } from './VisualStrategy';

export class Waveform implements VisualStrategy {

    display(data: Uint8Array, canvas: HTMLCanvasElement) {
        let canvasCtx = canvas?.getContext('2d');

        if (canvasCtx) {
            const WIDTH = canvas.width;
            const HEIGHT = canvas.height;   

            canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
            
            // Background
            canvasCtx.fillStyle = 'rgb(0, 0, 0)';
            canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
        
            // Line
            canvasCtx.lineWidth = 2;
            canvasCtx.strokeStyle = 'rgb(255, 255, 255)';
            canvasCtx.beginPath();
        
            const sliceWidth = WIDTH * 1.0 / data.length; // data.length * 2?
            let x = 0;
        
            for(var i = 0; i < data.length; i++) {
        
                const v = data[i] / 128.0;
                const y = v * HEIGHT / 2;
        
                if(i === 0) {
                canvasCtx.moveTo(x, y);
                } else {
                canvasCtx.lineTo(x, y);
                }
        
                x += sliceWidth;
            }
        
            canvasCtx.lineTo(WIDTH, HEIGHT / 2);
            canvasCtx.stroke();
        }
    }

}