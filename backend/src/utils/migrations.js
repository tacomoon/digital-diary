'use strict'

const config = require('config')
const { exec } = require('child_process')
const { console: logger } = require('./logger')

const dialect = config.get('database.config.dialect')
const username = config.get('database.config.username')
const password = config.get('database.config.password')
const host = config.get('database.config.host')
const port = config.get('database.config.port')
const database = config.get('database.config.database')

const command = process.argv[2]
const script = `sequelize ${command} \
  --migrations-path src/migrations/ \
  --url '${dialect}://${username}:${password}@${host}:${port}/${database}'`

logger.info(`Executing: ${script}\n`.replace(`:${password}`, ':*****'))

const { stdout, stderr } = exec(script)

stdout.on('data', data => console.log(data))
stderr.on('data', data => console.log(data))
stderr.on('exit', code => console.log(`Child process exited with code: ${code}`))
