
function CircularGraphicEffect() {
    this.name = "CircularGraphic";

    this.setup = function() {
        // Any setup specific to this effect
    }

    this.draw = function() {
        background(0);
        var spectrum = fourier.analyze();
        var bass = fourier.getEnergy("bass");
        var treble = fourier.getEnergy("treble");

        // Draw central circle
        noFill();
        stroke(255);
        strokeWeight(2);
        ellipse(width / 2, height / 2, bass * 2, bass * 2);

        // Draw rotating lines
        for (let i = 0; i < 360; i += 20) {
            let x = width / 2 + cos(radians(i)) * bass;
            let y = height / 2 + sin(radians(i)) * bass;
            let x2 = width / 2 + cos(radians(i)) * (bass + 50);
            let y2 = height / 2 + sin(radians(i)) * (bass + 50);

            stroke(random(255), random(255), random(255));
            line(x, y, x2, y2);
        }

        // Draw surrounding circles
        for (let i = 0; i < spectrum.length; i += 10) {
            let angle = map(i, 0, spectrum.length, 0, TWO_PI);
            let x = width / 2 + cos(angle) * (200 + spectrum[i]);
            let y = height / 2 + sin(angle) * (200 + spectrum[i]);

            fill(spectrum[i], 255 - spectrum[i], 150);
            noStroke();
            ellipse(x, y, 10, 10);
            triangle(x, y, x + 20, y + 30, x - 20, y + 30);
            rect(x, y, 20, 20);
        }
    }
}

function Pulse() {
    this.name = "Pulse";
    var pulseSize = 0;

    this.draw = function() {
        var bassEnergy = fourier.getEnergy("bass");

        var size = map(pulseSize, 0, 255, width / 4, width);
        fill(255, 50);
        noStroke();
        ellipse(width / 2, height / 2, size, size);
        pulseSize *= 0.95; // Slowly decrease the size for a pulsing effect
    };

    this.triggerBeatEffect = function() {
        // Increase the size on beat
        pulseSize = 255;
    };

    this.unSelectVisual = function() {
        console.log("Pulse unselected");
    }

    this.selectVisual = function() {
        console.log("Pulse selected");
    }
}


//        // Draw triangles based on treble energy
//        if (treble > 150) {
//            for (let i = 0; i < 5; i++) {
//                let x = random(width);
//                let y = random(height);
//                fill(random(255), random(255), random(255));
//                noStroke();
//                triangle(x, y, x + 20, y + 30, x - 20, y + 30);
//            }
//        }
//
//        // Draw squares based on bass energy
//        if (bass > 200) {
//            for (let i = 0; i < 5; i++) {
//                let x = random(width);
//                let y = random(height);
//                fill(random(255), random(255), random(255));
//                noStroke();
//                rect(x, y, 20, 20);
//            }
//        }
//    }
//
