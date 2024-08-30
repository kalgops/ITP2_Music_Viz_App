function Particle(x, y, colour, angle, speed) {
    var x = x;
    var y = y;
    var angle = angle;
    this.speed = speed;
    this.colour = colour;
    this.age = 255;

    this.draw = function() {
        this.update();
        var r = red(this.colour) - (255 - this.age);
        var g = green(this.colour) - (255 - this.age);
        var b = blue(this.colour) - (255 - this.age);

        var c = color(r, g, b);
        fill(c);
        this.age -= 1;

        push();
        translate(x, y);
        rotate(angle);

        // Draw the heart shape
        beginShape();
        vertex(0, -10);
        bezierVertex(10, -20, 20, 0, 0, 20);
        bezierVertex(-20, 0, -10, -20, 0, -10);
        endShape(CLOSE);

        pop();
    };

    this.update = function() {
        this.speed -= 0.1;
        x += cos(angle) * speed + noise(frameCount) * 10;
        y += sin(angle) * speed + noise(frameCount) * 10;
    };
}
