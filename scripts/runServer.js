
const config = require('../config/config')
const join = require('path').join
const spawn = require('child_process').spawn
const webpackConfig = require('../webpack')

const output = webpackConfig.filter((x) => x.target === 'node')[0].output
const serverFile = join(output.path, output.filename)
const IS_RUNNING = new RegExp(config.signal, 'g')

function runServer() {
  const pool = []

  return () => new Promise((accept) => {
    const running = pool.length
    const server = spawn('node', [serverFile])

    while (pool.length) {
      pool[0].kill('SIGTERM')
      pool.pop()
    }

    server.stdout.on('data', onStdoutData(server, accept, running))
    server.stderr.on('data', process.stderr.write)

    process.on('exit', killServer(server))

    pool.push(server)
  })
}

const onStdoutData = (server, accept, running) => (data) => {
  const time = new Date().toTimeString().slice(0, 8) // eslint-disable-line no-magic-numbers
  const match = data.toString('utf8').match(IS_RUNNING)

  process.stdout.write(`[server.js][${time}]: `)
  process.stdout.write(data)

  if (match) {
    server.stdout.removeListener('data', onStdoutData)
    if (!running) accept(false)
  }
}

const killServer = (server) => () => server.kill('SIGTERM')

module.exports = runServer
