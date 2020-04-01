const NodeHelper = require('node_helper')
const { spawn } = require('child_process')

const DEFAULT_FETCH_INTERVAL = 60000

module.exports = NodeHelper.create({
  start: function() {
    this.message = ''
    if (!this.timer) {
      this.timer = setInterval(() => this.readFortune(), DEFAULT_FETCH_INTERVAL)
    }
    this.readFortune()
  },
  socketNotificationReceived: function(name, payload) {
    if (name === 'START') {
      this.start()
    }
  },
  readFortune: function () {
    const process = spawn('fortune')
    process.stdout.on('data', (data) => {
      const fortune = String.fromCharCode.apply(null, data)
      this.sendSocketNotification('FORTUNE_DONE', fortune)
    })
  }
})
