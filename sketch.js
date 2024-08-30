//
//var controls = null;
//var vis = null;
//var sound = null;
//var fourier;
//
//function preload(){
//    sound = loadSound(guiControls.track);
//}
//
//function setup(){
//    createCanvas(windowWidth, windowHeight);
//    background(0);
//    controls = new ControlsAndInput();
//
//    fourier = new p5.FFT();
//
//    vis = new Visualisations();
//    vis.add(new Spectrum());
//    vis.add(new WavePattern());
//    vis.add(new Needles());
//    vis.add(new RidgePlots());
//    vis.add(new FireworkEffect());
//    vis.add(new CircularGraphicEffect());
//
//    if(vis.visuals.length > 0){
//        vis.selectVisual(vis.visuals[0].name);
//    }
//
// 
//    sound.pause();
//
//    //To setup the GUI
//    setupGUI();
//}
//
//function draw(){
//    background(0);
//    
//    // Use GUI parameters in the visualizations
//    if(vis.selectedVisual){
//        vis.selectedVisual.draw(guiControls);
//    }
//    controls.draw();
//}
//
//function mouseClicked(){
//    controls.mousePressed();
//}
//
//function keyPressed(){
//    controls.keyPressed(keyCode);
//}
//
//function windowResized(){
//    resizeCanvas(windowWidth, windowHeight);
//    if(vis.selectedVisual && vis.selectedVisual.hasOwnProperty('onResize')){
//        vis.selectedVisual.onResize();
//    }
//}

//var controls = null;
//var vis = null;
//var sound = null;
//var fourier;
//
//var trackList = [
//    { name: 'Track1', file: 'assets/Track1.mp3' },
//    { name: 'Track2', file: 'assets/Track2.mp3' },
//    { name: 'Track3', file: 'assets/Track3.mp3'}
//];
//
//function preload(){
//    sound = loadSound(guiControls.track);
//}
//
//function setup(){
//    createCanvas(windowWidth, windowHeight);
//    background(0);
//
//    setupGUI();
//
//    controls = new ControlsAndInput();
//
//    fourier = new p5.FFT();
//
//    vis = new Visualisations();
//    vis.add(new Spectrum());
//    vis.add(new WavePattern());
//    vis.add(new Needles());
//    vis.add(new RidgePlots());
//    vis.add(new FireworkEffect());
//    vis.add(new CircularGraphicEffect());
//
//    if(vis.visuals.length > 0){
//        vis.selectVisual(vis.visuals[0].name);
//    }
//
//    sound.pause(); // Pause initially until play is triggered
//    sound.setVolume(guiControls.volume); // Set initial volume
//}
//
//function draw(){
//    background(0);
//
//    if(vis.selectedVisual){
//        vis.selectedVisual.draw(guiControls);
//    }
//    controls.draw();
//}
//
//function mouseClicked(){
//    if (controls) {
//        controls.mousePressed();
//    }
//}
//
//function keyPressed(){
//    if (controls) {
//        controls.keyPressed(keyCode);
//    }
//}
//
//function windowResized(){
//    resizeCanvas(windowWidth, windowHeight);
//    if(vis.selectedVisual && vis.selectedVisual.hasOwnProperty('onResize')){
//        vis.selectedVisual.onResize();
//    }
//}

var controls = null;
var vis = null;
var sound = null;
var fourier;

var trackList = [
    { name: 'Track1', file: 'assets/Track1.mp3' },
    { name: 'Track2', file: 'assets/Track2.mp3' },
    { name: 'Track3', file: 'assets/Track3.mp3' }
];

function preload(){
    sound = loadSound(guiControls.track);
}

function setup(){
    createCanvas(windowWidth, windowHeight);
    background(0);

    setupGUI();

    controls = new ControlsAndInput();

    fourier = new p5.FFT();

    vis = new Visualisations();
    vis.add(new Spectrum());
    vis.add(new WavePattern());
    vis.add(new Needles());
    vis.add(new RidgePlots());
    vis.add(new FireworkEffect());
    vis.add(new CircularGraphicEffect());

    if(vis.visuals.length > 0){
        vis.selectVisual(vis.visuals[0].name);
    }

    sound.pause(); // Pause initially until play is triggered
    sound.setVolume(guiControls.volume); // Set initial volume
}

function draw(){
    background(0);

    if(vis.selectedVisual){
        vis.selectedVisual.draw(guiControls);
    }
    controls.draw();
}

function mouseClicked(){
    if (controls) {
        controls.mousePressed();
    }
}

function keyPressed(){
    if (controls) {
        controls.keyPressed(keyCode);
    }
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
    if(vis.selectedVisual && vis.selectedVisual.hasOwnProperty('onResize')){
        vis.selectedVisual.onResize();
    }
}
