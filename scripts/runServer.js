
const config = require('../config/config')
const path = require('path')
const spawn = require('child_process').spawn
const webpackConfig = require('../webpack')

const output = webpackConfig.find((x) => x.target === 'node').output
const serverFile = path.join(output.path, output.filename)
const IS_RUNNING = new RegExp(config.signal, 'g')

function runServer() {
  const pool = []

  return () => new Promise((resolve) => {
    const running = pool.length
    const server = spawn('node', [serverFile])

    while (pool.length) {
      pool[0].kill('SIGTERM')
      pool.pop()
    }

    server.stderr.on('data', process.stderr.write)
    server.stdout.on('data', (data) => {
      const time = new Date().toTimeString().slice(0, 8) // eslint-disable-line no-magic-numbers
      const match = data.toString().match(IS_RUNNING)

      process.stdout.write(`[server.js][${time}]: `)
      process.stdout.write(data)

      if (match && !running) resolve(false)
    })

    pool.push(server)
  })
}

module.exports = runServer
