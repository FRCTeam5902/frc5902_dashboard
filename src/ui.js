// Define UI elements
let ui = {
    timer: document.getElementById('timer'),
    robotState: document.getElementById('robot-state').firstChild,
    robotDiagram: {
        // arm: document.getElementById('robot-arm')
    },
    drivemode: {
        readout: document.getElementById('drive-mode-readout').firstChild
    },
    test: {
        readout: document.getElementById('test-readout').firstChild
    },
    autoSelect: document.getElementById('auto-select'),
    armPosition: document.getElementById('arm-position')
};

// This button is just an example of triggering an event on the robot by clicking a button.
NetworkTables.addKeyListener('/SmartDashboard/F Pistons', (key, value) => {
    ui.test.readout.data = value;

    if (value == 'false') {
        // makes pistons disappear when teleop is initiated
        document.getElementById("front-pistons").style="display:none;";
    }
    else {
       //makes pistons come back when activated
        document.getElementById("front-pistons").style="display:block;";
    } 
});

NetworkTables.addKeyListener('/SmartDashboard/B Pistons', (key, value) => {

    if (value == 'false') {
        // makes pistons disappear when teleop is initiated
        document.getElementById("back-pistons").style="display:none;";
    }
    else {
       //makes pistons come back when activated
        document.getElementById("back-pistons").style="display:block;";
    } 
});

NetworkTables.addKeyListener('/SmartDashboard/Drive Mode', (key, value) => {
    // Set class active if value is true and unset it if it is false
    ui.drivemode.readout.data = value;
     if (value == 'Cargo Front') {
        ui.drivemode.readout.data = value;
        document.getElementById("drive-img").src="../images/cargo.png";
    }
    else {
        ui.drivemode.readout.data = value;
        document.getElementById("drive-img").src="../images/hatch.png";
    } 
});

NetworkTables.addKeyListener('/SmartDashboard/Time', (key, value) => {
    // This is an example of how a dashboard could display the remaining time in a match.
    // We assume here that value is an integer representing the number of seconds left.
    ui.timer.textContent = value < 0 ? '0:00' : Math.floor(value / 60) + ':' + (value % 60 < 10 ? '0' : '') + value % 60;
});

// Load list of prewritten autonomous modes
NetworkTables.addKeyListener('/SmartDashboard/autonomous/modes', (key, value) => {
    // Clear previous list
    while (ui.autoSelect.firstChild) {
        ui.autoSelect.removeChild(ui.autoSelect.firstChild);
    }
    // Make an option for each autonomous mode and put it in the selector
    for (let i = 0; i < value.length; i++) {
        var option = document.createElement('option');
        option.appendChild(document.createTextNode(value[i]));
        ui.autoSelect.appendChild(option);
    }
    // Set value to the already-selected mode. If there is none, nothing will happen.
    ui.autoSelect.value = NetworkTables.getValue('/SmartDashboard/currentlySelectedMode');
});

// Load list of prewritten autonomous modes
NetworkTables.addKeyListener('/SmartDashboard/autonomous/selected', (key, value) => {
    ui.autoSelect.value = value;
});

<<<<<<< HEAD


=======
>>>>>>> 2df0af0fa3e0e02e0170f7291fc8f0f97ee340b4
// Update NetworkTables when autonomous selector is changed
ui.autoSelect.onchange = function() {
    NetworkTables.putValue('/SmartDashboard/autonomous/selected', this.value);
};
// Get value of arm height slider when it's adjusted

/* ui.armPosition.oninput = function() {
    NetworkTables.putValue('/SmartDashboard/arm/encoder', parseInt(this.value));
 }; */

addEventListener('error',(ev)=>{
    ipc.send('windowError',{mesg:ev.message,file:ev.filename,lineNumber:ev.lineno})
})