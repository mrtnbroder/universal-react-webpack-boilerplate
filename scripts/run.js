
function format(time) {
  return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1')
}

function run(task, options) {
  const start = new Date()

  process.stdout.write(`[${format(start)}] Starting '${task.name}'...\n`)

  return task(options).then(() => {
    const end = new Date()
    const time = end.getTime() - start.getTime()

    process.stdout.write(`[${format(end)}] Finished '${task.name}' after ${time} ms\n`)
  })
}

if (require.main === module && require.main.children.length === 0 && process.argv.length > 2) {
  delete require.cache[__filename]
  run(require(`./${process.argv[2]}.js`))
}

module.exports = run
