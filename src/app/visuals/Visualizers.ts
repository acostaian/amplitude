import AudioData from '../models/AudioData';
import { VisualStrategy } from './VisualStrategy';

class Bar implements VisualStrategy {

    display(
        audioData: AudioData,
        canvas: HTMLCanvasElement
    ) {
        const mainTimeDomain = audioData.mainTimeDomainData;
        const secondaryTimeDomain = audioData.secondaryTimeDomainData;

        let canvasCtx = canvas?.getContext('2d');

        if (canvasCtx) {
            const WIDTH = canvas.width;
            const HEIGHT = canvas.height;

            canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

            // Background
            canvasCtx.fillStyle = 'rgb(0, 0, 0)';
            canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

            // Bar
            let barWidth = (WIDTH / mainTimeDomain.length);
            let barHeight;
            let x = 0;

            // Draw each left bar
            for (let i = 0; i < mainTimeDomain.length; i++) {
                barHeight = mainTimeDomain[i] * 3;

                canvasCtx.fillStyle = 'rgbA(255, 255, 255, 0.8)';
                canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight);

                x += barWidth + 0.1;
            }

            barWidth = (WIDTH / mainTimeDomain.length);
            x = 0;

            // Draw each rigth bar
            for (let i = 0; i < secondaryTimeDomain.length; i++) {
                barHeight = secondaryTimeDomain[i] * 3;

                canvasCtx.fillStyle = 'rgbA(255, 255, 255, 0.8)';
                canvasCtx.fillRect(x, 0, barWidth, barHeight / 2);

                x += barWidth + 0.1;
            }
        }
    }

}

class BarFreq implements VisualStrategy {
    display(
        audioData: AudioData,
        canvas: HTMLCanvasElement
    ) {
        const mainFrequency = audioData.mainFrequencyData;
        const secondaryFrequency = audioData.secondaryFrequencyData;

        let canvasCtx = canvas?.getContext('2d');

        if (canvasCtx) {
            const WIDTH = canvas.width;
            const HEIGHT = canvas.height;

            canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

            // Background
            canvasCtx.fillStyle = 'rgb(0, 0, 0)';
            canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

            // Bar
            let barWidth = (WIDTH / mainFrequency.length);
            let barHeight;
            let x = 0;

            // Draw each left bar
            for (let i = 0; i < mainFrequency.length; i++) {
                barHeight = mainFrequency[i] * 3;

                canvasCtx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                canvasCtx.fillRect(x, HEIGHT, barWidth, -barHeight);

                x += barWidth + 0.1;
            }

            x = WIDTH;

            // Draw each rigth bar
            for (let i = 0; i < secondaryFrequency.length; i++) {
                barHeight = secondaryFrequency[i] * 3;

                canvasCtx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                canvasCtx.fillRect(x, HEIGHT, barWidth, -barHeight);

                x -= barWidth + 0.1;
            }
        }
    }
}

class Waveform implements VisualStrategy {

    display(
        audioData: AudioData,
        canvas: HTMLCanvasElement
    ) {
        const mainTimeDomain = audioData.mainTimeDomainData;
        const secondaryTimeDomain = audioData.secondaryTimeDomainData;

        let canvasCtx = canvas?.getContext('2d');

        if (canvasCtx) {
            const WIDTH = canvas.width;
            const HEIGHT = canvas.height;   

            canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
            
            // Background
            canvasCtx.fillStyle = 'rgb(0, 0, 0)';
            canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
        
            // Draw Lines
            let sliceWidth = WIDTH * 1.0 / mainTimeDomain.length; // timeDomain.length * 2?
            let mainX = 0;
            let secondaryX = 0;
            const mainPath = new Path2D();
            const secondaryPath = new Path2D();

            for(let i = 0; i < mainTimeDomain.length; i++) {

                const mainV = mainTimeDomain[i] / 128;
                const mainY = mainV * (HEIGHT / 2);
                const secondaryV = secondaryTimeDomain[i] / 128;
                const secondaryY = secondaryV * (HEIGHT / 2);

                if (i === 0) {
                    mainPath.moveTo(mainX, mainY);
                    secondaryPath.moveTo(secondaryX, secondaryY);
                } else {
                    mainPath.lineTo(mainX, mainY);
                    secondaryPath.lineTo(secondaryX, secondaryY);
                }

                mainX += sliceWidth;
                secondaryX += sliceWidth;
            }

            mainPath.lineTo(WIDTH, HEIGHT / 2);
            secondaryPath.lineTo(WIDTH, HEIGHT / 2);

            canvasCtx.lineWidth = 2;
            canvasCtx.strokeStyle = 'rgb(255, 255, 0)';
            canvasCtx.stroke(mainPath);
            canvasCtx.strokeStyle = 'rgb(255, 255, 255)';
            canvasCtx.stroke(secondaryPath);
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
