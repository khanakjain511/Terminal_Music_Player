const path = require("path");
const { playSong, pauseSong, skipForward, skipBackward, stopSong, getPlayerProcess } = require("./player/player");
const { getTotalDurationOfSong } = require("./player/duration");
const displayMenu = require("./ui/menu");

// SONGS
const songMenu = [ "TereBin.mp3", "TumSeHi.mp3", "Udaarian.mp3", "TereNainonMein.mp3", "DerLagiLekin.mp3", "ChaandBaaliyan.mp3", "Barsaat.mp3", "Always.mp3", "Demons.mp3", "PeeLoon.mp3", "Aarzu.mp3" ];

// VARIABLES
let userChoice = 0;
let isPause = true;
let elapsedDuration = 0;
let totalDuration = 0;

// Search variables
let searchMode = false;
let searchQuery = "";
let filteredSongs = [...songMenu];

// TERMINAL
process.stdin.setRawMode(true);
process.stdin.resume();

// PLAY SONG
async function startSong() {
    const selectedSong = filteredSongs[userChoice];
    if (!selectedSong) {
        return;
    }

    // Find original index
    const originalIndex = songMenu.indexOf(selectedSong);
    userChoice = originalIndex;
    const songPath = path.join( __dirname, "../songs", selectedSong );
    elapsedDuration = 0;
    totalDuration = await getTotalDurationOfSong(songPath);
    playSong(songPath);
    isPause = false;
}

// SEARCH
function updateSearch() {
    filteredSongs = songMenu.filter((song) =>
        song.toLowerCase().includes(
            searchQuery.toLowerCase()
        )
    );

    userChoice = 0;
}

// KEYBOARD INPUT
process.stdin.on("data", async (data) => {
    // CTRL + C
    if (data[0] === 0x03) {
        stopSong();
        process.exit(0);
    }

    // SEARCH MODE
    if (searchMode) {
        // ENTER
        if (data[0] === 0x0d) {
            searchMode = false;
            if (filteredSongs.length > 0) {
                await startSong();
            }
            return;
        }

        // BACKSPACE
        if (data[0] === 0x7f) {
            searchQuery = searchQuery.slice(0, -1);
            updateSearch();
            return;
        }

        // ESC
        if (data[0] === 0x1b) {
            searchMode = false;
            searchQuery = "";
            filteredSongs = [...songMenu];
            userChoice = 0;
            return;
        }

        // NORMAL CHARACTER
        const character = data.toString();
        if (character.length === 1) {
            searchQuery += character;
            updateSearch();
        }
        return;
    }

    // SEARCH START
    if (data[0] === 0x2f) {
        searchMode = true;
        searchQuery = "";
        filteredSongs = [...songMenu];
        userChoice = 0;
        return;
    }

    // UP ARROW
    if ( data[0] === 0x1b && data[1] === 0x5b && data[2] === 0x41 ) {
        userChoice--;
        if (userChoice < 0) {
            userChoice = filteredSongs.length - 1;
        }
    }

    // DOWN ARROW
    else if ( data[0] === 0x1b && data[1] === 0x5b && data[2] === 0x42 ) {
        userChoice++;
        if ( userChoice >= filteredSongs.length ) {
            userChoice = 0;
        }
    }

    // RIGHT ARROW - +2 SECONDS
    else if ( data[0] === 0x1b && data[1] === 0x5b && data[2] === 0x43 ) {
        skipForward();
        elapsedDuration += 2;
        if ( totalDuration && elapsedDuration > totalDuration ) {
            elapsedDuration = totalDuration;
        }
    }

    // LEFT ARROW - -2 SECONDS
    else if ( data[0] === 0x1b && data[1] === 0x5b && data[2] === 0x44 ) {
        skipBackward();
        elapsedDuration -= 2;
        if (elapsedDuration < 0) {
            elapsedDuration = 0;
        }
    }

    // ENTER
    else if (data[0] === 0x0d) {
        await startSong();
    }

    // P
    else if (data[0] === 0x70) {
        if (!getPlayerProcess()) {
            return;
        }
        pauseSong();
        isPause = !isPause;
    }

    // N → NEXT
    else if (data[0] === 0x6e) {
        userChoice++;
        if ( userChoice >= filteredSongs.length ) {
            userChoice = 0;
        }
        await startSong();
    }

    // B → PREVIOUS
    else if (data[0] === 0x62) {
        userChoice--;
        if (userChoice < 0) {
            userChoice = filteredSongs.length - 1;
        }
        await startSong();
    }
});

// TIMER
setInterval(() => {
    if ( !isPause && getPlayerProcess() ) {
        elapsedDuration += 0.05;
        if ( totalDuration && elapsedDuration >= totalDuration ) {
            elapsedDuration = totalDuration;
            isPause = true;
        }
    }

    displayMenu( filteredSongs, userChoice, elapsedDuration, totalDuration, isPause, getPlayerProcess(), searchMode, searchQuery );

}, 50 );