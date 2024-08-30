// Initialize GUI controls object
var guiControls = {
    track: 'assets/Track2.mp3', // Default track
    speed: 1.0,                 // Playback speed
    volume: 0.5                 // Volume control (default is 50%)
};

var gui;

function setupGUI() {
    // Initialize the GUI
    gui = new dat.GUI();

    // Manually create the track selector instead of using dat.GUI
    createTrackSelector();

    // Add speed control
    gui.add(guiControls, 'speed', 0.1, 3.0).name('Playback Speed').onChange(updateSpeed);

    // Add volume control
    gui.add(guiControls, 'volume', 0.0, 1.0).name('Volume').onChange(updateVolume);

    // Apply custom styles to the GUI
    styleGUI(gui);
}

function createTrackSelector() {
    var folder = gui.addFolder('Track');
    trackList.forEach((track, index) => {
        folder.add({ [track.name]: function() {
            changeTrack(track.file);
        }}, track.name);
    });
    folder.open();
}

function styleGUI(gui) {
    const controllers = gui.__controllers;
    controllers.forEach(controller => {
        const domElement = controller.domElement;
        const input = domElement.querySelector('input');
        const select = domElement.querySelector('select');
        const slider = domElement.querySelector('.slider');
        const sliderFg = domElement.querySelector('.slider-fg');

        if (input) {
            input.style.background = '#222';
            input.style.color = '#ff8c00';
            input.style.border = '1px solid #555';
        }

        if (select) {
            select.style.background = '#222';
            select.style.color = '#ff8c00';
            select.style.border = '1px solid #555';
        }

        if (slider) {
            slider.style.background = '#444';
        }

        if (sliderFg) {
            sliderFg.style.background = '#ff8c00';
        }
    });
}

function changeTrack(track) {
    sound.stop();
    sound = loadSound(track, function() {
        sound.loop();
        sound.rate(guiControls.speed);
        sound.setVolume(guiControls.volume); // Set the volume to the current control value
    });
}

function updateSpeed(value) {
    sound.rate(value);
}

function updateVolume(value) {
    sound.setVolume(value);
}
