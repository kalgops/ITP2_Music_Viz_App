function RidgePlots() {
    this.name = "Ridge Plots";

    var startX;
    var startY;
    var endY;
    var spectrumWidth;
    var speed = 0.7;
    var output = [];
    var maxWaves = 65;
    var beatDetect = new BeatDetect();

    this.onResize = function () {
        startX = width / 5;
        endY = height / 10; // Increase the endY to allow more vertical space for waves
        startY = height - endY;
        spectrumWidth = (width / 5) * 3;
    };

    this.onResize();

    this.draw = function () {
        background(0, 50); // Add some transparency to create a trailing effect

        var spectrum = fourier.analyze();
        var isBeat = beatDetect.detectBeat(spectrum);

        if (frameCount % 10 == 0) {
            addWave();
        }

        for (var i = output.length - 1; i >= 0; i--) {
            var wave = output[i];
            var hue = map(wave[0].y, endY, startY, 0, 360);
            colorMode(HSB, 360);
            stroke(hue, 360, 360);
            fill(hue, 360, 360, 50); // Add transparency to the fill

            beginShape();
            for (var j = 0; j < wave.length; j++) {
                wave[j].y -= speed;
                var thickness = map(wave[j].y, endY, startY, 1, 5); // Dynamic thickness
                strokeWeight(thickness);
                vertex(wave[j].x, wave[j].y);

                // Draw dynamic lines based on the beat
                if (isBeat && j % 5 == 0 && wave[j].y > endY) {
                    var amplitude = map(wave[j].y, endY, startY, 1, 100); // Adjust amplitude scaling as needed
                    line(wave[j].x, wave[j].y, wave[j].x, wave[j].y - amplitude);
                }
            }
            endShape(CLOSE);

            if (wave[0].y < endY) {
                output.splice(i, 1);
            }
        }

        // RGB color mode reset
        colorMode(RGB);
    }

    function addWave() {
        var w = fourier.waveform();
        var outputWave = [];
        var smallScale = 10; // Increase smallScale for taller waves
        var bigScale = 20; // Increase bigScale for taller waves

        for (var i = 0; i < w.length; i++) {
            if (i % 20 == 0) {
                var x = map(i, 0, 1024, startX, startX + spectrumWidth);

                if (i < 1024 * 0.25 || i > 1024 * 0.75) {
                    var y = map(w[i], -1, 1, -smallScale, smallScale);
                    var o = { x: x, y: startY + y };
                    outputWave.push(o);
                }
            }
        }

        if (output.length > maxWaves) {
            output.shift(); // Remove the oldest wave to maintain the maximum number of waves
        }

        output.push(outputWave);
    }
}

function BeatDetect() {
    var sampleBuffer = [];

    this.detectBeat = function(spectrum) {
        var sum = 0;
        var isBeat = false;
        for (var i = 0; i < spectrum.length; i++) {
            sum += spectrum[i] * spectrum[i];
        }

        if (sampleBuffer.length == 60) {
            var sampleSum = 0;

            // Detect a beat
            for (var i = 0; i < sampleBuffer.length; i++) {
                sampleSum += sampleBuffer[i];
            }
            var sampleAverage = sampleSum / sampleBuffer.length;
            var c = calculateConstant(sampleAverage);
            if (sum > sampleAverage * c) {
                isBeat = true;
            }
            sampleBuffer.splice(0, 1);
            sampleBuffer.push(sum);
        } else {
            sampleBuffer.push(sum);
        }

        return isBeat;
    }

    function calculateConstant(sampleAverage) {
        var varianceSum = 0;
        for (var i = 0; i < sampleBuffer.length; i++) {
            varianceSum += sampleBuffer[i] - sampleAverage;
        }
        var variance = varianceSum / sampleBuffer.length;

        var m = -0.15 / (25 - 200);
        var b = 1 + (m * 200);
        var c = (m * variance) + b;
        return c;
    }
}


