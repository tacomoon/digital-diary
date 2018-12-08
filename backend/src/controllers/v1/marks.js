'use strict'

const moment = require('moment')
const express = require('express')
const { Op } = require('sequelize')

const { mapMarkCore, mapMarkExtended } = require('../../utils/entity-mappers')
const { Marks, Subjects, Students, Teachers, Users } = require('../../models')

const router = new express.Router({})

router.get('/student/:id', (req, res, next) => {
  const fromDate = moment(req.query.from || Date.now()).isoWeekday(1).toDate()

  Marks
    .findAll({
      where: {
        student_id: req.params.id,
        date: {
          [Op.gte]: fromDate
        }
      },
      include: [
        { model: Subjects },
        {
          model: Students,
          include: [{ model: Users }]
        },
        {
          model: Teachers,
          include: [{ model: Users }]
        },
      ]
    })
    .then(marks => res.json(marks.map(mapMarkExtended)))
    .catch(err => next(err))
})

router.get('/teacher/:teacher_id/class/:class_id', (req, res, next) => {
  const fromDate = moment(req.query.from || Date.now()).isoWeekday(1).toDate()

  Students
    .findAll({ where: { class_id: req.params.class_id } })
    .then(students => Marks.findAll({
      where: {
        teacher_id: req.params.teacher_id,
        student_id: {
          [Op.in]: students.map(it => it.id)
        },
        date: {
          [Op.gte]: fromDate
        }
      },
      include: [
        { model: Subjects },
        {
          model: Students,
          include: [{ model: Users }]
        },
        {
          model: Teachers,
          include: [{ model: Users }]
        },
      ]
    }))
    .then(marks => res.json(marks.map(mapMarkExtended)))
    .catch(err => next(err))
})

router.post('/', ({ body }, res, next) => {
  Marks
    .create({
      teacher_id: body.teacher,
      student_id: body.student,
      subject_id: body.subject,
      value: body.value,
    })
    .then(mark => {
      res.json(mapMarkCore(mark))
    })
    .catch(err => next(err))
})

router.put('/:id', (req, res, next) => {
  Marks
    .update({
        date: Date.now(),
        value: req.body.value,
      },
      {
        where: { id: req.params.id },
        returning: true,
      },
    )
    .then(([_, marks]) => {
      res.json(marks.map(mapMarkCore))
    })
    .catch(err => next(err))
})

module.exports = router