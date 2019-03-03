const puppeteer = require('puppeteer')

class Renderer {
  constructor(blacklist = [], cache = new Map()) {
    this.cache = cache
    this.browserInstance = null,
    this.blacklist = blacklist
  }

  async getBrowser() {
    if(!this.browserInstance) {
      this.browserInstance = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      })
      return this.browserInstance
    }

    return this.browserInstance
  }

  

  async render(url) {
    const urlString = url.toString()

    if(this.cache.has(urlString)) {
      console.log(`Loading ${urlString} from cache`)
      return {
        content: this.cache.get(urlString),
        timeRendered: 0
      }
    }

    const start = Date.now()
    const browser = await this.getBrowser()
    const page = await browser.newPage()

    await page.setRequestInterception(true)

    page.on('request', req => {
      // Don't process blacklisted
      if (this.blacklist.find(pattern => req.url().match(pattern))) {
        console.log(`Skipping ${urlString}`)
        return req.abort()
      }
      return req.continue()
    })

    console.log(`Trying: ${urlString}`)
    await page.goto(urlString, { waitUntil: 'networkidle2' })
      .catch(err => console.log(`Error: ${err}`))

    const content = await page.content()
    // await page.close()
    await this.browserInstance.close()
    this.cache.set(urlString, content)

    const timeRendered = Date.now() - start

    return { content, timeRendered }
  }
}

module.exports = Renderer
