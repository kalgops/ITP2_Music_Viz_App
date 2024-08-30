function Spectrum() {
    this.name = "spectrum";

    this.draw = function () {
        push();
        var spectrum = fourier.analyze();
        noStroke();
        
        // First spectrum with green to red gradient
        var c1 = color(0, 255, 0);
        var c2 = color(255, 0, 0);
        for (var i = 0; i < spectrum.length; i++) {
            var y = map(i, 0, spectrum.length, 0, height);
            var h = map(spectrum[i], 0, 255, 0, width);
            var c = lerpColor(c1, c2, spectrum[i] / 255);
            fill(c);
            rect(0, y, h, height / spectrum.length);
        }

        // Second spectrum with blue to purple gradient
        var c3 = color(0, 0, 255);
        var c4 = color(128, 0, 128);
        for (var i = 0; i < spectrum.length; i++) {
            var y = map(i, 0, spectrum.length, 0, height);
            var h = map(spectrum[i], 0, 255, 0, width);
            var c = lerpColor(c3, c4, spectrum[i] / 255);
            fill(c);
            rect(width / 2, y, h / 2, height / spectrum.length); // Offset the second spectrum
        }

        // Third spectrum with yellow to cyan gradient
        var c5 = color(255, 255, 0);
        var c6 = color(0, 255, 255);
        for (var i = 0; i < spectrum.length; i++) {
            var y = map(i, 0, spectrum.length, 0, height);
            var h = map(spectrum[i], 0, 255, 0, width);
            var c = lerpColor(c5, c6, spectrum[i] / 255);
            fill(c);
            ellipse(width / 2, y, h / 4, height / spectrum.length); // Use circles
        }

        // Fourth element: Diagonal lines
        stroke(255);
        for (var i = 0; i < spectrum.length; i++) {
            var x = map(i, 0, spectrum.length, 0, width);
            var h = map(spectrum[i], 0, 255, 0, height / 2);
            line(x, height - h, x + 10, height - h - 10); // Diagonal lines
        }

        pop();
    };

    this.unSelectVisual = function () {
        console.log("Spectrum unselected");
    }

    this.selectVisual = function () {
        console.log("Spectrum selected");
    }
}
