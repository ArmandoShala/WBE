//
// timeout vs immediate
//
const fs = require('fs')

setTimeout(() => {
  console.log('1 timeout')
}, 0)

setImmediate(() => {
  console.log('2 immediate')
})

fs.readFile("immediate2.js", () => {
  setTimeout(() => {
    console.log('3 timeout from readFile callback')
  }, 0)
  setImmediate(() => {
    console.log('4 immediate from readFile callback')
  })
})

console.log('5 script started')

/*
* Annahme:  1, 2, 3, 4, 5
* Tatsache: 5, 1, 2, 4, 3
* Warum?    tbd
* */
