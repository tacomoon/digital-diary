'use strict'

const moment = require('moment')
const express = require('express')
const { Op } = require('sequelize')
const { mapMarkCore, mapMarkExtended } = require('../../utils/entity-mappers')
const { Marks, Subjects, Students, Teachers, Users } = require('../../models')

const router = new express.Router({})

router.get('/student/:id', async (req, res) => {
  const fromDate = moment(req.query.from || Date.now()).isoWeekday(1).toDate()

  const marks = await Marks.findAll({
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

  res.json(marks.map(mapMarkExtended))
})

router.get('/teacher/:teacher_id/class/:class_id', async (req, res) => {
  const fromDate = moment(req.query.from || Date.now()).isoWeekday(1).toDate()

  const students = await Students.findAll({
    where: {
      class_id: req.params.class_id
    }
  })
  const marks = await Marks.findAll({
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
  })

  res.json(marks.map(mapMarkExtended))
})

router.post('/', ({ body }, res) => {
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
})

router.put('/:id', (req, res) => {
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
})

module.exports = router