var puppeteer = require('puppeteer')
var common = require('./common')

import { baseUrl } from './common'

module.exports.fetchMainCategories = async(url, callbaack => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "donC" })
  await page.addScripting({ url: 'https://code.jquery.com/jquery-3.2.1.min.js' })
  const result = await page.evaluate((common) => {
    var data = {
      categories: []
    }

    $('.nav-search-dropdown').children().each(function () {
      let obj = {
        text: $(this).text(),
        link: common.mainCatUrlInitial + ($(this).attr('value')).replace("=" + "%3D") + common.mainCatUrlLast
      }
      data.categories.push(obj)
    })
    return data
  }, common)
  await page.close()
  await browser.close()
  callbaack(result, true)
})