import schedule from 'node-schedule'
import getLogger from '../../shared/logger'

const logger = getLogger('scheduler')
function execute (asyncFunc) {
  return async function () {
    try {
      await asyncFunc()
    } catch (e) {
      logger.error(e)
    }
  }
}
export const jobs = {}
export async function run (name) {
  const { default: scheduler } = await import(`./jobs/${name}`)
  const job = jobs[name] = schedule.scheduleJob(scheduler.name, scheduler.schedule, execute(scheduler.handler))
  job.on('run', execute(scheduler.events.run))
  job.on('scheduled', execute(scheduler.events.scheduled))
  job.on('canceled', execute(scheduler.events.canceled))
}

// server required
export function start ({ jobs }) {
  jobs.forEach(run)
  console.log(`scheduler started with jobs: ${jobs}`)
}
