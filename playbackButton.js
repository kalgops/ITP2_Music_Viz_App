p// PlaybackButton class to handle play/pause functionality
function PlaybackButton() {
    this.x = 20;
    this.y = 20;
    this.width = 20;
    this.height = 20;

    // Flag to determine whether to play or pause after button click and to determine which icon to draw
    this.playing = false;

    this.draw = function() {
        push();
        fill('white');
        stroke('black');
        strokeWeight(2);
        if (this.playing) {
            // Draw pause icon
            rect(this.x, this.y, this.width / 2 - 2, this.height);
            rect(this.x + (this.width / 2 + 2), this.y, this.width / 2 - 2, this.height);
        } else {    
            // Draw play icon
            triangle(this.x, this.y, this.x + this.width, this.y + this.height / 2, this.x, this.y + this.height);
        }
        pop();
    };

    // Checks for clicks on the button, starts or pauses playback
    // @returns true if clicked, false otherwise
    this.hitCheck = function() {
        if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height) {
            this.togglePlayPause(); // Toggle play/pause on click
            return true;
        }
        return false;
    };

    // Toggles the play/pause state of the music
    this.togglePlayPause = function() {
        if (sound.isPlaying()) {
            sound.pause();
        } else {
            sound.play();
        }
        this.playing = !this.playing;
    };
}
