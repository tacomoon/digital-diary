'use strict'

const { Subject } = require('../../models')
const { mapSubject, mapList } = require('../../utils/entity-mappers')

const express = require('express')
const router = new express.Router()

router.get('/all', async (req, res) => {
  const subjects = await Subject.findAndCountAll()
  res.json(mapList(mapSubject)(subjects))
})

router.get('/:id', async (req, res) => {
  const subject = await Subject.findById(req.params.id)
  res.json(mapSubject(subject))
})

router.post('/', async (req, res) => {
  const { body: {name} } = req

  const subject = await Subject.create({
    name: name
  })

  res.json(mapSubject(subject))
})

module.exports = router
