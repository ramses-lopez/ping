const puppeteer = require('puppeteer')
const player = require('play-sound')(opts = {})

async function checkUrl(browser) {

  let page = await browser.newPage()
  const url = 'http://citaslegalizaciones.mppre.gob.ve/'
  // const url = 'http://mail.google.com'

  try {
    await page.goto(url)
    console.log(`[${new Date()}] ********** PAGE ALIVE ********** ${url}`)
    beep()
  }
  catch(e){
    console.log(`[${new Date()}] Page down`)
  }
  finally {
    page.close()
  }
}

const execute = async () => {
  const browser = await puppeteer.launch({devtools:false, headless: true})

  await checkUrl(browser)

  while(true){
    await checkUrl(browser)
  }
}

function beep(){
  const file = '/usr/lib/libreoffice/share/gallery/sounds/untie.wav'
  player.play(file, err => console.error(err))
}

let Script = {}
Script.execute = execute
module.exports = Script
