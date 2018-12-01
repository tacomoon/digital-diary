'use strict'

const express = require('express')
const { mapClass, mapStudent } = require('../../utils/entity-mappers')
const { Classes, Students, Users, Teachers } = require('../../models')

const router = new express.Router({})

router.get('/:id', async (req, res, next) => {
  const clazz = await Classes.findByPk(req.params.id)
  const students = await Students.findAll({
    where: { class_id: clazz.id },
    include: [{ model: Users }]
  })

  res.json({ name: clazz.name, students: students.map(mapStudent) })
})

router.get('/student/:id', async (req, res, next) => {
  const student = await Students.findByPk(req.params.id)
  const clazz = await student.getClass()
  const students = await Students.findAll({
    where: { class_id: clazz.id },
    include: [{ model: Users }]
  })

  res.json({ name: clazz.name, students: students.map(mapStudent) })
})

router.get('/teacher/:id', async (req, res, next) => {
  const teacher = await Teachers.findByPk(req.params.id)
  const classes = await teacher.getClasses()

  res.json(classes.map(mapClass))
})

module.exports = router