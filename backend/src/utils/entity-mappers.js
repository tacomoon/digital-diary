'use strict'

const mapSubject = ({ id, name }) => ({ id, name })

const mapList = (mapEntityFunction) => ({ count, rows }) => ({ count, entities: rows.map(mapEntityFunction) })

module.exports = {
  mapSubject,
  mapList
}
