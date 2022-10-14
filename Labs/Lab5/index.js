// const Song = require("./lib/jasmine_examples/Song.js");
// const Player = require("./lib/jasmine_examples/Player.js");

import Song from './lib/jasmine_examples/Song.js';
import Player from './lib/jasmine_examples/Player.js';

const song = new Song("Let it be");
const player = new Player();

player.play(song);

function checkIfSongPlays() {
    return player.isPlaying ? song.title : 'No song playing';
}


console.log(checkIfSongPlays())


