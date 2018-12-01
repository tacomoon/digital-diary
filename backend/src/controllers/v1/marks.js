'use strict'

const moment = require('moment')
const express = require('express')
const { Op } = require('sequelize')
const { mapMark } = require('../../utils/entity-mappers')
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

  res.json(marks.map(mapMark))
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

  res.json(marks.map(mapMark))
})

module.exports = router