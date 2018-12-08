'use strict'

const moment = require('moment')
const express = require('express')
const { Op } = require('sequelize')

const { BadRequestError } = require('../../errors')
const { mapMarkCore, mapMarkExtended } = require('../../utils/entity-mappers')
const { Marks, Subjects, Students, Teachers, Users } = require('../../models')

const router = new express.Router({})

router.get('/student/:id', (req, res, next) => {
  const studentId = req.params.id
  if (!studentId) {
    throw new BadRequestError('Request parameter \'student id\' is required')
  }

  const fromDate = moment(req.query.from || Date.now()).isoWeekday(1).toDate()

  Marks
    .findAll({
      where: {
        student_id: studentId,
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

  const teacherId = req.params.teacher_id
  if (!teacherId) {
    throw new BadRequestError('Request parameter \'teacher id\' is required')
  }
  const classId = req.params.teacher_id
  if (!classId) {
    throw new BadRequestError('Request parameter \'class id\' is required')
  }

  Students
    .findAll({ where: { class_id: classId } })
    .then(students => Marks.findAll({
      where: {
        teacher_id: teacherId,
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

router.post('/', (req, res, next) => {
  const teacherId = req.body.teacher
  if (!teacherId) {
    throw new BadRequestError('Body parameter \'teacher id\' is required')
  }
  const studentId = req.body.student
  if (!studentId) {
    throw new BadRequestError('Body parameter \'student id\' is required')
  }
  const subjectId = req.body.subject
  if (!subjectId) {
    throw new BadRequestError('Body parameter \'subject id\' is required')
  }
  const value = req.body.value
  if (!value) {
    throw new BadRequestError('Body parameter \'value\' is required')
  }

  Marks
    .create({
      teacher_id: teacherId,
      student_id: studentId,
      subject_id: subjectId,
      value: value,
    })
    .then(mark => {
      res.json(mapMarkCore(mark))
    })
    .catch(err => next(err))
})

router.put('/:id', (req, res, next) => {
  const teacherId = req.params.teacher_id
  if (!teacherId) {
    throw new BadRequestError('Request parameter \'teacher id\' is required')
  }
  const value = req.body.value
  if (!value) {
    throw new BadRequestError('Body parameter \'value\' is required')
  }

  Marks
    .update({
        date: Date.now(),
        value: value,
      },
      {
        where: { id: teacherId },
        returning: true,
      },
    )
    .then(([_, marks]) => {
      res.json(marks.map(mapMarkCore))
    })
    .catch(err => next(err))
})

module.exports = router