import { command } from 'ryzen'
import config from '../../deploy/config'
import glob from 'fast-glob'

command({
  command: '$0 [servers...]',
  builder: {
    servers: {
      default: ['spa']
    },
    jobs: { default: [], type: 'array' },
    port: { default: 0, type: 'number' }
  },
  describe: 'start servers',
  handler (argv) {
    argv.servers.forEach(async name => {
      const servers = await glob('**', { deep: 0, cwd: 'app/servers', onlyFiles: false })
      if (servers.includes(name)) {
        const server = await import(`../servers/${name}`)
        server.start({
          port: argv.port || config.app.get(`servers.${name}.port`),
          jobs: argv.jobs
        })
      }
    })
  }
}).exec()
