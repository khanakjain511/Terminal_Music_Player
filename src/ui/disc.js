const discFrames = [ "◉", "◌", "○", "◍" ];
let frame = 0;

function getDisc(isPlaying) {
    if (!isPlaying) {
        return "◉";
    }
    const currentFrame = discFrames[frame];
    frame++;
    if (frame >= discFrames.length) {
        frame = 0;
    }
    return currentFrame;
}

module.exports = getDisc;