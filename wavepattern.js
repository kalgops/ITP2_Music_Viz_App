function WavePattern() {
    // vis name
    this.name = "wavepattern";

    // draw the waveform to the screen
    this.draw = function () {
        push();
        noFill();
        strokeWeight(2);

        // calculate the waveform from the fft
        var wave = fourier.waveform();

        // Draw first wave with red gradient
        stroke(255, 0, 0);
        beginShape();
        for (var i = 0; i < wave.length; i++) {
            var x = map(i, 0, wave.length, 0, width);
            var y = map(wave[i], -1, 1, 0, height);
            vertex(x, y);
        }
        endShape();

        // Draw second wave with green gradient
        stroke(0, 255, 0);
        beginShape();
        for (var i = 0; i < wave.length; i++) {
            var x = map(i, 0, wave.length, 0, width);
            var y = map(wave[i], -1, 1, height / 4, height * 3 / 4);
            vertex(x, y);
        }
        endShape();

        // Draw third wave with blue gradient
        stroke(0, 0, 255);
        beginShape();
        for (var i = 0; i < wave.length; i++) {
            var x = map(i, 0, wave.length, 0, width);
            var y = map(wave[i], -1, 1, height / 2 - 100, height / 2 + 100);
            vertex(x, y);
        }
        endShape();

        // Draw fourth wave with yellow gradient
        stroke(255, 255, 0);
        beginShape();
        for (var i = 0; i < wave.length; i++) {
            var x = map(i, 0, wave.length, 0, width);
            var y = map(wave[i], -1, 1, height / 2, height);
            vertex(x, y);
        }
        endShape();

        // Draw points along the waveform
        stroke(255, 0, 255);
        strokeWeight(4);
        for (var i = 0; i < wave.length; i += 5) {
            var x = map(i, 0, wave.length, 0, width);
            var y = map(wave[i], -1, 1, 0, height);
            point(x, y);
        }

        // Draw filled area under the first waveform with rainbow gradient
        noStroke();
        for (var i = 0; i < wave.length; i++) {
            var x = map(i, 0, wave.length, 0, width);
            var y = map(wave[i], -1, 1, 0, height);

            var r = map(i, 0, wave.length, 255, 0);
            var g = map(i, 0, wave.length, 0, 255);
            var b = map(i, 0, wave.length, 255, 0);

            fill(r, g, b, 100); // Rainbow color with transparency
            beginShape();
            vertex(x, y);
            vertex(x + (width / wave.length), y);
            vertex(x + (width / wave.length), height);
            vertex(x, height);
            endShape(CLOSE);
        }

        pop();
    };

    this.unSelectVisual = function () {
        console.log("WavePattern unselected");
    }

    this.selectVisual = function () {
        console.log("WavePattern selected");
    }
}


