// With ES6 syntax, we export like this:
export default function Song(title) {
  this.title = title
}

Song.prototype.persistFavoriteStatus = function(value) {
  // something complicated
  throw new Error("not yet implemented");
};

/*
// With node.js syntax, we can write the same thing like this:
function Song(title) {
  ...
}
// magic goes here

module.exports = Song;

// Dont forget to modify package.json (remove the "type": "module" line)
*/
