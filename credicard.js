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
  try {
    // const browser = await puppeteer.launch({headless: false, slowMo: 50})
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto('file:///home/ramses/Desktop/Mis%20Tarjetas%20-%20CredicardenLinea.com.ve.html') 

    // await page.waitFor('body')

    let values = await page.evaluate(() => {
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

    await browser.close()
    return values
  }
  catch(e){
    console.error(e)
    return e
  }
}

let Script = {}
Script.execute = execute
module.exports = Script
