var common = require('./common')
var lodash = require('lodash')
var fs = require('fs')
import { fetchMainCategories } from ('./stepper')

fetchMainCategories(
  common.baseUrl,
  function (data, response) {
    if (response) {
      console.log(data)
      fs.appendFile("categories.json", JSON.stringify(data.categories), function (err) {
        if (err) {
          console.log("Error")
        } else {
          console.log('Data exported')
        }
      })
    }
  })