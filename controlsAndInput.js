// Constructor function to handle the onscreen menu, keyboard and mouse controls
function ControlsAndInput(){
    
    this.menuDisplayed = false;
    
    // Playback button displayed in the top left of the screen
    this.playbackButton = new PlaybackButton();

    // Make the window fullscreen or revert to windowed
    this.mousePressed = function(){
        // Check if the playback button has been clicked
        var isButtonClicked = this.playbackButton.hitCheck();
        // If not to make the visualisation fullscreen
        if(!isButtonClicked){
            var fs = fullscreen();
            fullscreen(!fs);
        }
    };

    // Responds to keyboard presses
    // @param keycode the ASCII code of the key pressed
    this.keyPressed = function(keycode){
        console.log(keycode);
        if(keycode == 32){
            this.menuDisplayed = !this.menuDisplayed;
        }

        if(keycode > 48 && keycode < 58){
            var visNumber = keycode - 49;
            vis.selectVisual(vis.visuals[visNumber].name); 
        }
    };

    // Draws the playback button and potentially the menu
    this.draw = function(){
        push();
        fill("white");
        stroke("black");
        strokeWeight(2);
        textSize(34);

        // Playback button 
        this.playbackButton.draw();
        // Only draw the menu if menuDisplayed is set to true.
        if(this.menuDisplayed){
            text("Select a visualisation:", 100, 30);
            this.menu();
        }   
        pop();
    };

    this.menu = function(){
        // Draw out menu items for each visualisation
        for(var i = 0; i < vis.visuals.length; i++){
            var yLoc = 70 + i * 40;
            text((i + 1) + ":  " + vis.visuals[i].name, 100, yLoc);
        }
    };
}

