require('dotenv').load()

const express = require("express");
const path = require("path");
const Renderer = require("./renderer")

const app = express()
const PORT = process.env.PORT || 5001;

app.get('*', async (req, res) => {
  const blacklist = ['google-analytics', 'ga.js']
  // Get request URL
  const requestURL = `${process.env.SPA_SITE}${req.originalUrl}`
  const renderer = new Renderer(blacklist)

  let { content, timeRendered } = await renderer.render(requestURL)

  console.info(`${requestURL} was rendered in ${timeRendered}ms\n----`)
  const splitUrl = requestURL.split('.')
  const ext = splitUrl.length === 1 ? 'html' : splitUrl[splitUrl.length - 1]

  switch(ext) {
    case 'js':
      break
    default:
      break
  }

  return res
    .status(200)
    .send(content)
})

app.listen(PORT, () => console.log(`Booted! Running at http://localhost:${PORT}`))
