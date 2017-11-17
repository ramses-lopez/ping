const puppeteer = require('puppeteer')

const execute = async () => {
  try {
    const valueSelector = value => `#contenido > table > tbody > tr:nth-child(5) > td > table > tbody > tr:nth-child(7) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(8) > td:nth-child(${value})`
    const username = process.env['BDV_USERNAME'] 
    const password = process.env['BDV_PASSWORD'] 
    //const browser = await puppeteer.launch({headless: false, slowMo: 50})
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto('https://e-bdvcpx.banvenez.com/clavenetpersonal/inc/BV_TopeIzquierdo_f10.asp')
    //await page.goto('file:///home/ramses/Desktop/Cl@venet%20Personal%20-%20Cliente%20RAMSES%20REINALDO%20LOPEZ%20SUAREZ.html')

    console.log('navigating to login page')

    //login
    const selector = 'input[name=\'notarjeta1\']'
    await page.waitFor(selector)
    await page.type(selector, username)
    await page.type('input[name=passwordp1]', password)
    await page.click('[type=submit]')

    console.log('login submitted')

    await page.waitForNavigation()
    await page.goto('https://e-bdvcpx.banvenez.com/clavenetpersonal/principal/index_sumario.asp')

    console.log('login succeded')

    // await page.waitForNavigation()

    // TDC Venezuela
    const ccTableSelector = '#contenido > table > tbody > tr:nth-child(5) > td > table > tbody > tr:nth-child(7) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(8)'

    console.log('waiting for main page load')
    await page.waitFor(ccTableSelector)

    const values = await page.evaluate(() => {
      //cuenta 
      const numeroCuentaCC = document.querySelector('#contenido > table > tbody > tr:nth-child(5) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(6) > td > table > tbody > tr:nth-child(2) > td:nth-child(1) > div > a').innerText
      const saldoTotalCC = document.querySelector('#contenido > table > tbody > tr:nth-child(5) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(6) > td > table > tbody > tr:nth-child(2) > td:nth-child(4)').innerText
      const disponibleCC = document.querySelector('#contenido > table > tbody > tr:nth-child(5) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(6) > td > table > tbody > tr:nth-child(2) > td:nth-child(5)').innerText

      //tdc
      const numeroTarjeta = document.querySelector('#contenido > table > tbody > tr:nth-child(5) > td > table > tbody > tr:nth-child(7) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(8) > td:nth-child(1) > a').innerText
      const facturado = document.querySelector('#contenido > table > tbody > tr:nth-child(5) > td > table > tbody > tr:nth-child(7) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(8) > td:nth-child(5)').innerText
      const actual = document.querySelector('#contenido > table > tbody > tr:nth-child(5) > td > table > tbody > tr:nth-child(7) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(8) > td:nth-child(6)').innerText
      const disponible = document.querySelector('#contenido > table > tbody > tr:nth-child(5) > td > table > tbody > tr:nth-child(7) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(8) > td:nth-child(7)').innerText

      return {
        account: {
          number: numeroCuentaCC,
          total: saldoTotalCC,
          available: disponibleCC,  
        },
        credit_card: {
          number: numeroTarjeta.slice(-4),
          facturado: facturado,
          current: actual,
          available: disponible,  
        }
      }
    })
    // await page.screenshot({path: 'screenshot.png'})
    //salida del sistema
    await page.click('#pers > div > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td:nth-child(8) > strong > a')   
    await browser.close()
    return values

  } catch (e) {
    console.error(e);
  } 
}

let Script = {}
Script.execute = execute
module.exports = Script


