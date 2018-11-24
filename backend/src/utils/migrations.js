'use strict'

const config = require('config')
const { exec } = require('child_process')
const { server: logger } = require('./logger')

const dialect = config.get('db.config.dialect')
const username = config.get('db.config.username')
const password = config.get('db.config.password')
const host = config.get('db.config.host')
const port = config.get('db.config.port')
const database = config.get('db.config.database')

const command = process.argv[2]
const script = `sequelize ${command} \
  --migrations-path src/migrations/ \
  --url '${dialect}://${username}:${password}@${host}:${port}/${database}'`

logger.info(`Executing: ${script}\n`.replace(`:${password}`, ':*****'))

const { stdout, stderr } = exec(script)

function formatMessage (method, data) {
  const message = data.toString().replace(/(\r\n|\n|\r)/gm, '')
  if (message.length) logger[method](message)
}

stdout.on('data', data => formatMessage('info', data))
stderr.on('data', data => formatMessage('error', data))
stderr.on('exit', code => logger.error('Child process exited with code: ' + code))
