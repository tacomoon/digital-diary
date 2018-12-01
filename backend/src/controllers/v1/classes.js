'use strict'

const express = require('express')
const { mapClassCore, mapClassExtended } = require('../../utils/entity-mappers')
const { Classes, Students, Users, Teachers } = require('../../models')

const router = new express.Router({})

router.get('/:id', async (req, res) => {
  const clazz = await Classes.findByPk(req.params.id)
  const students = await Students.findAll({
    where: { class_id: clazz.id },
    include: [{ model: Users }]
  })

  res.json(mapClassExtended(clazz, students))
})

router.get('/student/:id', async (req, res) => {
  const student = await Students.findByPk(req.params.id)
  const clazz = await student.getClass()

  res.redirect(`../${clazz.id}`)
})

router.get('/teacher/:id', async (req, res) => {
  const teacher = await Teachers.findByPk(req.params.id)
  const classes = await teacher.getClasses()

  res.json(classes.map(mapClassCore))
})

module.exports = router