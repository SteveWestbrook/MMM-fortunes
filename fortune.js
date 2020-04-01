Module.register('fortune', {
  defaults: {},
  start: function() {
    this.sendSocketNotification('START')
  },
  getDom: function() {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = ''
    this.wrapper = wrapper
    return wrapper
  },
  socketNotificationReceived: function(notification, payload) {
    if (notification === 'FORTUNE_DONE') {
      const text = (payload || '')//.replace(/\u000a/g, '<br>')
      this.wrapper.innerText = text
    }
  }
})
