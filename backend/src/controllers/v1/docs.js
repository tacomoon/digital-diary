'use strict'

const fs = require('fs')
const path = require('path')
const express = require('express')
const { NotFoundError } = require('../../errors')

const router = new express.Router({})

router.get('/', (req, res) => {
  const filepath = path.join(process.cwd(), 'generated/openapi/index.html')
  if (!fs.existsSync(filepath)) {
    throw new NotFoundError("Docs was not generated")
  } else {
    res.sendFile(filepath)
  }
})

module.exports = router