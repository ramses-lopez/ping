require('dotenv').config()
const bdv = require('./bdv')
const credicard = require('./credicard')

;(async () => {
  try {
    // const bdvResult = await bdv.execute()
    // console.log(bdvResult)
    const ccResult = await credicard.execute()
    console.log('ccResult', ccResult)
  }
  catch(e){
    console.error(e)
    process.exit(1)
  }
})()
