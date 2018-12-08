'use strict'

const express = require('express')
const swagger = require('swagger-ui-express')
const yaml = require('yamljs')

const router = new express.Router({})

router.use('/', swagger.serve)

const doc = yaml.load("openapi.yaml")
const options = {
  customCss: '.swagger-ui .topbar { display: none }'
}
router.get('/', swagger.setup(doc, options))

module.exports = router