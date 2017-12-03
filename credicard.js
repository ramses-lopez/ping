/*
goto https://www.credicardenlinea.com.ve/
username #cedula-persona
waitForNavigation
password #password-persona
waitForNavigation
goto https://www.credicardenlinea.com.ve/group/guest/mis-tarjetas


contenedor de tarjetas 'div.ccr-cards-info'
arreglo, ahora sobre un elemento
tdc1.querySelector('p').innerText

num tarjeta info.slice(15,19)

tdcs = document.querySelectorAll('div.ccr-cards-info')
tdc1 = tdcs[0]
info = tdc1.querySelector('p').innerText
s = info.indexOf('Pago de Contado:')
e = info.indexOf('Pague antes del:')
info.slice(s,e)
s = info.indexOf('Pago de Contado:')
label= 'Pago de Contado:'
s = info.indexOf(label)
info.slice(s+label.length,e)

logout #nombre-logout
*/

const puppeteer = require('puppeteer')

const execute = async () => {
  const browser = await puppeteer.launch({devtools:false, headless: false, slowMo: 50})

  const passUrl = 'https://www.credicardenlinea.com.ve/password-personas'

  try {
    browser.on('targetchanged', t => console.log(`target changed: ${t.url()}`) )

    browser.on('targetcreated', async t => {
      console.log(`target created ${t.url()}`);


      if(t.url() == passUrl){
        console.log('password page');
        p = await t.page()

        const passwordSelector = '#password-persona'
        await p.waitFor(passwordSelector)
        await p.type(passwordSelector, password)
        await p.click('#page-open-submit')

        await p.waitForNavigation()
        await p.goto('https://www.credicardenlinea.com.ve/group/guest/mis-tarjetas')

        let values = await p.evaluate(() => {
          const startAnchorLabel = 'Pago de Contado:'
          const endAnchorLabel = 'Pague antes del:'
          const cards = Array.from(document.querySelectorAll('div.ccr-cards-info'))
          return cards.map(card => {
            const info = card.querySelector('p').innerText
            console.log(info)
            s = info.indexOf(startAnchorLabel)
            e = info.indexOf(endAnchorLabel)

            return {
              number: info.slice(15,19),
              facturado: info.slice(s+startAnchorLabel.length,e).trim()
            }
          })
        })

        console.log('*************************');
        console.log(values);
        console.log('*************************');

        // navegar a https://www.credicardenlinea.com.ve/group/guest/detalles-tarjeta?cardId=2
        // ver pagina en escritorio
        document.querySelector('#nombre-logout').click()
      }

    })

    // const browser = await puppeteer.launch()
    const page = await browser.newPage()
    page.on('load', () => console.log("Loaded: " + page.url()))

    const username = process.env['CC_USERNAME']
    const password = process.env['CC_PASSWORD']

    await page.goto('https://www.credicardenlinea.com.ve')

    const usernameSelector = '#cedula-persona'
    await page.waitFor(usernameSelector)
    await page.type(usernameSelector, username)
    await page.click('.ccr-page-open-submit')

    return {}
  }
  catch(e){
    console.error(e)
    browser.close()
    return e
  }
}

let Script = {}
Script.execute = execute
module.exports = Script
