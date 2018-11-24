'use strict'

const { Subject } = require('../../models')
const { mapSubject, mapList } = require('../../utils/entity-mappers')
const { NotFoundError } = require('../../errors')

const express = require('express')
const router = new express.Router()

router.get('/all', async (req, res, next) => {
  const subjects = await Subject.findAndCountAll()
    .catch(err => { next(err) })

  res.json(mapList(mapSubject)(subjects))
})

router.get('/:id', async (req, res, next) => {
  const subject = await Subject.findById(req.params.id)
    .catch(err => { next(err) })

  if (!subject) {
    next(new NotFoundError(`Subject with id ${req.params.id} not found`))
    return
  }
  res.json(mapSubject(subject))
})

router.post('/', async (req, res, next) => {
  const { body: { name } } = req

  const subject = await Subject.create({ name: name })
    .catch(err => { next(err) })

  res.json(mapSubject(subject))
})

module.exports = router
