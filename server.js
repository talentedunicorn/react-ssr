require('dotenv').load()

const request =  require("request");
const express = require("express");
const path = require("path");
const Renderer = require("./renderer")

const app = express()
const PORT = process.env.PORT || 5001;

app.get('*', async (req, res) => {
  const blacklist = ['/sockjs-node/', 'google-analytics', 'ga.js']
  // Get request URL
  const requestURL = `${process.env.SPA_SITE}${req.originalUrl}`
  const renderer = new Renderer(blacklist)

  let { content, timeRendered } = await renderer.render(requestURL)

  console.info(`${requestURL} was rendered in ${timeRendered}ms\n----`)
  const splitUrl = requestURL.split('.')
  const ext = splitUrl.length === 1 ? 'html' : splitUrl[splitUrl.length - 1]

  res.status(200)

  // Fetch everything except for html
  switch(ext) {
    case 'html':
      return res.send(content)
      break
    default:
      request({uri: requestURL}, function(err, response, body) {
        return res.send(body)
      })
      break
  }
})

app.listen(PORT, () => console.log(`Booted! Running at http://localhost:${PORT}`))
