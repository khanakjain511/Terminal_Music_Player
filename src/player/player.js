const { spawn } = require("child_process");
let playerProcess = null;

function playSong(songPath) {
    if (playerProcess) {
        playerProcess.kill("SIGKILL");
    }
    playerProcess = spawn("vlc", [ "--intf", "rc", songPath ]);
    return playerProcess;
}

function pauseSong() {
    if (playerProcess) {
        playerProcess.stdin.write("pause\n");
    }
}

function skipForward() {

    if (playerProcess) {
        playerProcess.stdin.write("seek +2\n");
    }
}

function skipBackward() {

    if (playerProcess) {
        playerProcess.stdin.write("seek -2\n");
    }
}

function stopSong() {
    if (playerProcess) {
        playerProcess.kill("SIGKILL");
        playerProcess = null;
    }
}

function getPlayerProcess() {
    return playerProcess;
}

module.exports = { playSong, pauseSong, stopSong, getPlayerProcess, skipForward, skipBackward };