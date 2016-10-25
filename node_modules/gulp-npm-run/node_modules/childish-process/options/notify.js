var notifier = require('node-notifier')

module.exports = function (something) {
  notifier.notify(something, function (err, response) {
    // NOTE: response could be handled via options fn or custom strategy notify
    if (err) {
      console.error(err)
      notifier.notify({
        message: 'Notification failure, check the error log for details.'
      })
    }
  })
}
