function createProgressBar(elapsedDuration, totalDuration) {

    const barLength = 30;
    if (!totalDuration) {
        return "░".repeat(barLength);
    }
    let progress = Math.floor(
        (elapsedDuration / totalDuration) * barLength
    );
    progress = Math.max(0, Math.min(progress, barLength));
    const completed = "█".repeat(progress);
    const remaining = "░".repeat(
        barLength - progress
    );

    return completed + remaining;
}

module.exports = createProgressBar;