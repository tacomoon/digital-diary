'use strict'

const express = require('express')
const { NotFoundError } = require('../../errors')
const { mapClassCore, mapClassExtended } = require('../../utils/entity-mappers')
const { Classes, Students, Users, Teachers } = require('../../models')

const router = new express.Router({})

router.get('/:id', async (req, res, next) => {
  const classId = req.params.id

  const clazz = await Classes.findByPk(classId)
    .catch(error => next(error))
  if (!clazz) {
    next(new NotFoundError(`Class with id ${classId} not found`))
    return
  }

  Students
    .findAll({
      where: { class_id: classId },
      include: [{ model: Users }]
    })
    .then(students => res.json(mapClassExtended(clazz, students)))
    .catch(err => next(err))
})

router.get('/student/:id', async (req, res, next) => {
  Students.findByPk(req.params.id)
    .then(student => student.getClass())
    .then(clazz => res.redirect(`../${clazz.id}`))
    .catch(err => next(err))
})

router.get('/teacher/:id', async (req, res, next) => {
  Teachers.findByPk(req.params.id)
    .then(teacher => teacher.getClasses())
    .then(classes => res.json(classes.map(mapClassCore)))
    .catch(err => next(err))
})

module.exports = router