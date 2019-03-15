export default {
  name: 'Example',
  description: 'Example',
  schedule: '* * * * * *',
  events: {
    run: console.log.bind(console, 'event run'),
    scheduled: console.log.bind(console, 'event scheduled'),
    canceled: console.log.bind(console, 'event canceled')
  },
  async handler () {
    console.log('running')
    throw new Error('test')
  }
}
