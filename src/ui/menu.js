const createProgressBar = require("./progressBar");
const formatTime = require("../utils/formatTime");
const getDisc = require("./disc");

function displayMenu( songMenu, userChoice, elapsedDuration, totalDuration, isPause, playerProcess, searchMode, searchQuery ) {

    process.stdout.write("\x1bc");
    console.log("🎵 TERMINAL MUSIC PLAYER\n");

    // SEARCH MODE
    if (searchMode) {
        console.log(`🔎 Search: ${searchQuery}\n`);
    }

    // SONG LIST
    songMenu.forEach((song, index) => {
        if (index === userChoice) {
            console.log(`> ${index + 1} : ${song}`);
        } else {
            console.log(`  ${index + 1} : ${song}`);
        }
    });

    console.log("\n----------------------------------------");

    // PLAYER
    if (playerProcess) {
        const status = isPause ? "⏸ PAUSED" : "▶ PLAYING";
        console.log(`${status} : ${songMenu[userChoice]}`);

        //Rotating disc
        console.log(
            `           ${getDisc(!isPause)}`
        );
    } else {
        console.log("⏹ NO SONG PLAYING");
    }

    // Progress Bar
    console.log(`[${createProgressBar( elapsedDuration, totalDuration )}]`);
    console.log(`${formatTime(elapsedDuration)} / ${formatTime(totalDuration)}`);
    console.log("----------------------------------------");

    // Controls
    console.log("↑ ↓ : Select Song");
    console.log("ENTER : Play   P : Pause/Play");
    console.log("N : Next   B : Previous");
    console.log("/ : Search   CTRL+C : Exit");
}

module.exports = displayMenu;