import schedule from 'node-schedule'
import assert from 'assert'
import { merge } from 'lodash'
import getLogger from '../../shared/logger'

const logger = getLogger('scheduler')
export const jobs = {}
export async function run (name) {
  const imported = await import(`./jobs/${name}`)
  const scheduler = merge({
    events: {
      scheduled: function () {},
      run: function () {},
      canceled: function () {}
    }
  }, imported.default)
  function execute (asyncFunc) {
    return async function () {
      try {
        await asyncFunc()
      } catch (e) {
        logger.error(e)
      }
    }
  }
  const job = jobs[name] = schedule.scheduleJob(scheduler.name, scheduler.schedule, execute(scheduler.handler))
  job.on('scheduled', execute(scheduler.events.scheduled))
  job.on('run', execute(scheduler.events.run))
  job.on('canceled', execute(scheduler.events.canceled))
}

// server required
export function start ({ jobs }) {
  assert(jobs.length > 0, 'Jobs is empty')
  jobs.forEach(run)
  console.log(`Scheduler server started with jobs: ${jobs}`)
}
