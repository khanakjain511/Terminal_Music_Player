const { spawn } = require("child_process");

function getTotalDurationOfSong(songPath) {

    return new Promise((resolve) => {
        const afInfoProcess = spawn("afinfo", [songPath]);
        let output = "";
        afInfoProcess.stdout.on("data", (data) => {
            output += data.toString();
        });

        afInfoProcess.on("close", () => {
            const match =
                output.match(/estimated duration:\s*([\d.]+)/);
            if (match) {
                resolve(Number(match[1]));
            } else {
                resolve(0);
            }
        });
    });
}

module.exports = { getTotalDurationOfSong };