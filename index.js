require('dotenv').config()
const apostilla = require('./apostilla')

;(async () => {
  try {
    process.stderr.write('\x07')
    const page = await apostilla.execute()
  }
  catch(e){
    console.error(e)
    process.exit(1)
  }
})()
