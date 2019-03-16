import Queue from 'bull'
import getLogger from '../../shared/logger'

const logger = getLogger('queue')
const queue = new Queue('Ryzen Queue')
queue.on('error', e => console.error(e))
queue.on('waiting', j => console.log('waiting'))
queue.on('active', j => console.log('active'))
queue.on('stalled', j => console.log('stalled'))
queue.on('process', j => console.log('process'))
queue.on('completed', j => console.log('completed'))
queue.on('failed', j => console.log('failed'))
queue.on('paused', j => console.log('paused'))
queue.on('resumed', j => console.log('resumed'))
queue.on('cleaned', j => console.log('cleaned'))
queue.on('drained', j => console.log('drained'))
queue.on('removed', j => console.log('removed'))

async function run (name) {
  const imported = await import(`./workers/${name}`)
  const worker = {
    concurrency: 1,
    ...imported.default
  }
  function execute (asyncFunc) {
    return async function (...args) {
      try {
        await asyncFunc(...args)
      } catch (e) {
        logger.error(e)
      }
    }
  }
  queue.process(worker.name, worker.concurrency, execute(worker.handler))
  console.log(`Worker #${name} is ready for processing`)
}

// import {queue} from './app/servers/queue'
// queue.add({WORKER_NAME}, {DATA}, {OPTIONS})
export { queue }

export function start ({ workers }) {
  workers.forEach(run)
  console.log('Queue server has been started')
}
