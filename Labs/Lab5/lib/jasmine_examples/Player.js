// With ES6 syntax, we export like this:

export default function Player() {
}
Player.prototype.play = function(song) {
  this.currentlyPlayingSong = song;
  this.isPlaying = true;
};

Player.prototype.pause = function() {
  this.isPlaying = false;
};

Player.prototype.resume = function() {
  if (this.isPlaying) {
    throw new Error("song is already playing");
  }

  this.isPlaying = true;
};

Player.prototype.makeFavorite = function() {
  this.currentlyPlayingSong.persistFavoriteStatus(true);
};

/*
// With node.js syntax, we can write the same thing like this:
function Player() {
  ...
}
// magic goes here

module.exports = Player;

// Dont forget to modify package.json (remove the "type": "module" line)
*/
