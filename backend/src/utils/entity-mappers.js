'use strict'

const mapClass = ({ id, name }) => ({ id, name })
const mapStudent = ({ id, user: { name, address, phone } }) => ({ id, name, address, phone })

module.exports = {
  mapClass,
  mapStudent
}
