# Terminal Music Player

A simple **Terminal-based Music Player** built using **Node.js** and **VLC**.
The project allows users to play songs directly from the terminal with keyboard controls, search, progress tracking, skipping, and a rotating disc animation.

---

## Features

* Play songs from the terminal
* Play / Pause music
* Next song
* Previous song
* Skip forward by **2 seconds**
* Skip backward by **2 seconds**
* Search songs
* Terminal progress bar
* Display elapsed and total duration
* Rotating disc animation while playing
* Keyboard-based controls
* Songs stored separately inside the `songs` folder
* Modular code structure with separate files for different responsibilities

---

## Technologies Used

* **Node.js** — Application logic and terminal input
* **VLC Media Player** — Audio playback
* **JavaScript** — Programming language
* **macOS `afinfo`** — Reading audio duration
* **Node.js built-in modules**

  * `child_process`
  * `path`

No external npm packages are required.

---

## Project Structure

```text
Terminal-Music-Player/
│
├── songs/
│   ├── Aarzu.mp3
│   ├── Always.mp3
│   ├── Barsaat.mp3
│   ├── ChaandBaaliyan.mp3
│   ├── Demons.mp3
│   ├── DerLagiLekin.mp3
│   ├── PeeLoon.mp3
│   ├── TereBin.mp3
│   ├── TereNainonMein.mp3
│   ├── TumSeHi.mp3
│   └── Udaarian.mp3
│
├── src/
│   ├── index.js
│   │
│   ├── player/
│   │   ├── player.js
│   │   └── duration.js
│   │
│   ├── ui/
│   │   ├── menu.js
│   │   ├── progressBar.js
│   │   └── disc.js
│   │
│   └── utils/
│       └── formatTime.js
│
├── package.json
└── README.md
```

---

## Requirements

Before running the project, make sure you have:

### 1. Node.js

Check if Node.js is installed:

```bash
node -v
```

### 2. VLC Media Player

VLC is used as the actual audio player.

Check whether VLC is available from the terminal:

```bash
vlc --version
```

### 3. macOS

The project currently uses the macOS `afinfo` command to get the duration of audio files.

---

## Installation

### Clone the Repository

```bash
git clone <your-repository-url>
```

Move into the project:

```bash
cd Terminal-Music-Player
```

### Install Dependencies

There are currently no external npm dependencies.

```bash
npm install
```

---

## Running the Project

Run:

```bash
node src/index.js
```

The music player will open directly in the terminal.

---

## Controls

| Key         | Action                   |
| ----------- | ------------------------ |
| `↑`         | Select previous song     |
| `↓`         | Select next song         |
| `Enter`     | Play selected song       |
| `P`         | Play / Pause             |
| `→`         | Skip forward 2 seconds   |
| `←`         | Skip backward 2 seconds  |
| `N`         | Play next song           |
| `B`         | Play previous song       |
| `/`         | Search songs             |
| `Backspace` | Delete search characters |
| `Esc`       | Exit search mode         |
| `Ctrl + C`  | Exit application         |

---

## Searching for Songs

Press:

```text
/
```

Then type the name of the song.

For example:

```text
Search: demons
```

The player filters songs based on the search query.

Press **Enter** to play the selected search result.

---

## Rotating Disc

The player uses multiple Unicode characters as animation frames:

```text
◉ → ◌ → ○ → ◍
```

The frame changes repeatedly while a song is playing, creating the appearance of a rotating disc in the terminal.

When the song is paused, the animation stops.

---

## Code Organization

The application follows a modular structure where each file has a specific responsibility.

### `player.js`

Handles VLC operations:

* Playing songs
* Pausing songs
* Skipping forward
* Skipping backward
* Stopping playback

### `duration.js`

Uses macOS `afinfo` to find the total duration of an audio file.

### `progressBar.js`

Creates the terminal progress bar using:

```text
█
░
```

It calculates progress based on:

```text
elapsed time / total duration
```

### `formatTime.js`

Converts seconds into a readable format:

```text
125 seconds → 02:05
```

### `disc.js`

Controls the rotating disc animation.

### `menu.js`

Responsible for displaying the terminal interface:

* Song list
* Current song
* Playback status
* Progress bar
* Duration
* Controls

### `index.js`

Acts as the **main controller** of the application.

It:

* Handles keyboard input
* Maintains the current song
* Manages search
* Controls playback
* Tracks elapsed time
* Connects all other modules

---

## Application Flow

```text
User Input
    ↓
 index.js
    ↓
 ┌───────────────┐
 │               │
 ↓               ↓
player.js       menu.js
 ↓               ↓
 VLC           Terminal UI
 │
 ↓
Audio Playback
```

For example, when the user presses `Enter`:

```text
Enter
  ↓
index.js
  ↓
player.js
  ↓
VLC
  ↓
Song starts playing
  ↓
menu.js updates terminal UI
```

---

## Current Limitations

* The player currently uses macOS-specific `afinfo`.
* VLC must be installed and accessible from the terminal.
* The progress timer is maintained by the Node.js application and may slightly differ from VLC's actual playback position.
* Songs need to be stored inside the `songs` folder.

---

## Future Improvements

Possible future improvements include:

* Volume control
* Shuffle mode
* Repeat mode
* Playlists
* Automatically detect songs from the `songs` folder
* Save recently played songs
* More terminal animations
* More accurate playback progress using VLC's actual position
* Remaining-time display
* Support for additional audio formats

---

## Learning Outcomes

Through this project, the following concepts are practiced:

* Node.js fundamentals
* CommonJS modules
* File and folder organization
* `child_process`
* Process management
* VLC command-line interaction
* Promises and asynchronous programming
* Terminal input handling
* Keyboard event handling
* String manipulation
* Array filtering
* Modular programming
* Basic UI design in the terminal

---

## Project

**Terminal Music Player**

Built as a Node.js application for learning backend and system-level programming concepts.
