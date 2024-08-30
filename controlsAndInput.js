////Constructor function to handle the onscreen menu, keyboard and mouse
////controls
//function ControlsAndInput(){
//    
//    this.menuDisplayed = false;
//    
//    //playback button displayed in the top left of the screen
//    this.playbackButton = new PlaybackButton();
//
//    //make the window fullscreen or revert to windowed
//    this.mousePressed = function(){
//        // Check if the playback button has been clicked
//        var isButtonClicked = this.playbackButton.hitCheck();
//        // Check if the mouse is on the gui panel
//        var inMouseinBlockGUI = blockMidHighLowApp.inMouseInGUI();
//        // If not to make the visualisation fullscreen
//        if(isButtonClicked == false && inMouseinBlockGUI == false){
//            var fs = fullscreen();
//            fullscreen(!fs);
//        } else if (isButtonClicked) {
//            // Toggle play/pause when the playback button is clicked
//            this.playbackButton.togglePlayPause(); 
//        }
//    };
//
//	//responds to keyboard presses
//	//@param keycode the ascii code of the keypressed
//	this.keyPressed = function(keycode){
//		console.log(keycode);
//		if(keycode == 32){
//			this.menuDisplayed = !this.menuDisplayed;
//		}
//
//		if(keycode > 48 && keycode < 58){
//			var visNumber = keycode - 49;
//			vis.selectVisual(vis.visuals[visNumber].name); 
//		}
//	};
//
//	//draws the playback button and potentially the menu
//	this.draw = function(){
//		push();
//		fill("white");
//		stroke("black");
//		strokeWeight(2);
//		textSize(34);
//
//		//playback button 
//		this.playbackButton.draw();
//		//only draw the menu if menu displayed is set to true.
//		if(this.menuDisplayed){
//
//			text("Select a visualisation:", 100, 30);
//			this.menu();
//		}	
//		pop();
//
//	};
//
//	this.menu = function(){
//		//draw out menu items for each visualisation
//		for(var i = 0; i < vis.visuals.length; i++){
//			var yLoc = 70 + i*40;
//			text((i+1) + ":  " +vis.visuals[i].name, 100, yLoc);
//		}
//	};
//}

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

