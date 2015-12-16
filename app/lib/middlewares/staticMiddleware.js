
import express from 'express'

//
// Static Assets
//

export default function(app) {
  app.use(express.static('public'))
}
