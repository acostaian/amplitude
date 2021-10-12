import { VisualStrategy } from './VisualStrategy';

class Bar implements VisualStrategy {

    display(
        data: { timeDomain: Uint8Array, frequency: Uint8Array }, 
        canvas: HTMLCanvasElement
    ) {
        let { timeDomain } = data;

        let canvasCtx = canvas?.getContext('2d');

        if (canvasCtx) {
            const WIDTH = canvas.width;
            const HEIGHT = canvas.height;

            canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

            // Background
            canvasCtx.fillStyle = 'rgb(0, 0, 0)';
            canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

            // Bar
            let barWidth = (WIDTH / timeDomain.length); // Multiply by 2.5 to remove low frequency bars 
            let barHeight;
            let x = 0;

            // Draw each bar
            for (let i = 0; i < timeDomain.length; i++) {
                barHeight = timeDomain[i] * 3;

                let color = barHeight + 100;
                canvasCtx.fillStyle = 'rgb(255, 255, 255)';
                canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight);

                x += barWidth + 0.1;
            }
        }
    }

}

class BarFreq implements VisualStrategy {
    display(
        data: { timeDomain: Uint8Array, frequency: Uint8Array }, 
        canvas: HTMLCanvasElement
    ) {
        let { frequency } = data;

        let canvasCtx = canvas?.getContext('2d');

        if (canvasCtx) {
            const WIDTH = canvas.width;
            const HEIGHT = canvas.height;

            canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

            // Background
            canvasCtx.fillStyle = 'rgb(0, 0, 0)';
            canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

            // Bar
            let barWidth = (WIDTH / frequency.length);
            let barHeight;
            let x = 0;

            // Draw each bar
            for (let i = 0; i < frequency.length; i++) {
                barHeight = frequency[i] * 3;

                let color = barHeight + 100;
                canvasCtx.fillStyle = 'rgb(255, 255, 255)';
                canvasCtx.fillRect(x, HEIGHT, barWidth, -barHeight);

                x += barWidth + 0.1;
            }
        }
    }
}

class Waveform implements VisualStrategy {

    display(
        data: { timeDomain: Uint8Array, frequency: Uint8Array }, 
        canvas: HTMLCanvasElement
    ) {
        let { timeDomain } = data;

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
        
            const sliceWidth = WIDTH * 1.0 / timeDomain.length; // timeDomain.length * 2?
            let x = 0;
        
            for(var i = 0; i < timeDomain.length; i++) {
        
                const v = timeDomain[i] / 128.0;
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

enum Strategy {
    WAVEFORM,
    BARS,
    BARSFREQ
};

export {
    Strategy,
    Bar,
    BarFreq,
    Waveform
};
