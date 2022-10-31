//
//  nexttick vs. immediate and timeout events
//

const fs = require('fs')
const process = require('process')

fs.readFile("nexttick.js", () => {
  
  setTimeout(() => {
    console.log('1 timeout')
  }, 0)
  
  setImmediate(() => {
    console.log('2 immediate')
  })
  
  process.nextTick(() => {
    console.log('3 nexttick')
  })

})

/*
* Annahme:  1, 3, 2
* Tatsache: 3, 2, 1
* Warum?    tbd
* */
