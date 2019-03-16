export default {
  name: 'Example',
  schedule: '*/5 * * * * *',
  events: {
    scheduled: console.log.bind(console, 'job scheduled'),
    triggered: console.log.bind(console, 'job triggered'),
    canceled: console.log.bind(console, 'job canceled')
  },
  async handler () {
    console.log('running')
    await new Promise((resolve, reject) => {
      setTimeout(resolve, 3000)
    })
    console.log('done')
    throw new Error('test')
  }
}
