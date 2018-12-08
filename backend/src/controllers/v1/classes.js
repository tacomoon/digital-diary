'use strict'

const express = require('express')
const { NotFoundError } = require('../../errors')
const { mapClassCore, mapClassExtended } = require('../../utils/entity-mappers')
const { Classes, Students, Users, Teachers } = require('../../models')

const router = new express.Router({})

router.get('/:id', async (req, res, next) => {
  const classId = req.params.id

  Classes.findByPk(classId)
    .then(clazz => new Promise((resolve, reject) => {
      if (!clazz) throw new NotFoundError(`Class with id: ${classId} not found`)

      Students
        .findAll({
          where: { class_id: classId },
          include: [{ model: Users }]
        })
        .then(students => resolve({ clazz, students }))
        .catch(err => reject(err))
    }))
    .then(({ clazz, students }) => res.json(mapClassExtended({ id: 12, name: 'example' }, students)))
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