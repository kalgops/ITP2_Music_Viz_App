
function Needles() {
    //name of the visualisation
    this.name = "needles";

    //how large is the arc of the needle plot.
    var minAngle = PI + PI / 10;
    var maxAngle = TWO_PI - PI / 10;

    this.plotsAcross = 2;
    this.plotsDown = 2;

    //frequencies used by the energy function to retrieve a value
    //for each plot.
    this.frequencyBins = ["bass", "lowMid", "highMid", "treble"];

    //resize the plots sizes when the screen is resized.
    this.onResize = function() {
        this.pad = width / 20;
        this.plotWidth = (width - this.pad) / this.plotsAcross;
        this.plotHeight = (height - this.pad) / this.plotsDown;
        this.dialRadius = (this.plotWidth - this.pad) / 2 - 5;
    };
    //call onResize to set initial values when the object is created
    this.onResize();

    // draw the plots to the screen
    this.draw = function() {
        //create an array amplitude values from the fft.
        var spectrum = fourier.analyze();
        //iterator for selecting frequency bin.
        var currentBin = 0;
        push();
        // Draw the background gradient
        this.drawGradientBackground();
        
        fill('#f0f2d2');
        //nested for loop to place plots in 2*2 grid.
        for (var i = 0; i < this.plotsDown; i++) {
            for (var j = 0; j < this.plotsAcross; j++) {
                var widthOffset = (j + 1) * this.pad / 2;
                var heightOffset = (i + 1) * this.pad / 2;

                //calculate the size of the plots
                var x = j * this.plotWidth + widthOffset;
                var y = i * this.plotHeight + heightOffset;
                var w = this.plotWidth;
                var h = this.plotHeight;

                //draw a rectangle at that location and size
                rect(x, y, w, h);

                //add on the ticks
                var centreX = (this.plotWidth / 2) + (this.plotWidth) * j + widthOffset;
                var bottomY = (this.plotHeight) * (i + 1) + heightOffset;

                var energy = fourier.getEnergy(this.frequencyBins[currentBin]);

                //add the needle
                this.needle(energy, centreX, bottomY);
                
                //add the ticks
                this.ticks(centreX, bottomY, this.frequencyBins[currentBin]);

                currentBin++;
            }
        }
        pop();
    };

    this.unSelectVisual = function() {
        // Functionality for unselecting the visual
    };

    this.selectVisual = function() {
        // Functionality for selecting the visual
    };

    /*
     *draws a needle to an individual plot
     *@param energy: The energy for the current frequency
     *@param centreX: central x coordinate of the plot rectangle
     *@param bottomY: The bottom y coordinate of the plot rectangle
     */
    this.needle = function(energy, centreX, bottomY) {
        push();
        stroke('#333333');
        //translate so 0 is at the bottom of the needle
        translate(centreX, bottomY);
        //map the energy to the angle for the plot
        var theta = map(energy, 0, 255, minAngle, maxAngle);
        //calculate x and y coordinates from angle for the length of needle
        var x = this.dialRadius * cos(theta);
        var y = this.dialRadius * sin(theta);
        //draw the needle
        line(0, 0, x, y);
        pop();
    };

    /*
     *draw the graph ticks on an individual plot
     *@param centreX: central x coordinate of the plot rectangle
     *@param bottomY: The bottom y coordinate of the plot rectangle
     *@param freqLabel: Label denoting the frequency of the plot
     */
    this.ticks = function(centreX, bottomY, freqLabel) {
        // 8 ticks from pi to 2pi
        var nextTickAngle = minAngle;
        push();
        stroke('#333333');
        fill('#333333');
        translate(centreX, bottomY);
        //draw the semi circle for the bottom of the needle
        arc(0, 0, 20, 20, PI, 2 * PI);
        textAlign(CENTER);
        textSize(12);
        text(freqLabel, 0, -(this.plotHeight / 2));

        for (var i = 0; i < 9; i++) {
            //for each tick work out the start and end coordinates of
            //based on its angle from the needle's origin.
            var x = this.dialRadius * cos(nextTickAngle);
            var x1 = (this.dialRadius - 5) * cos(nextTickAngle);

            var y = this.dialRadius * sin(nextTickAngle);
            var y1 = (this.dialRadius - 5) * sin(nextTickAngle);

            line(x, y, x1, y1);
            nextTickAngle += PI / 10;
        }
        pop();
    };

    /*
     * Draws a gradient background
     */
    this.drawGradientBackground = function() {
        noFill();
        for (var i = 0; i <= height; i++) {
            var inter = map(i, 0, height, 0, 1);
            var c = lerpColor(color(255, 215, 0, 100), color(255, 0, 0, 100), inter);
            stroke(c);
            line(0, i, width, i);
        }
    };
}
