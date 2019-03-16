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
    workers: { default: [], type: 'array' },
    port: { default: 0, type: 'number' },
    cluster: { default: false, type: 'boolean' }
  },
  describe: 'start servers',
  handler (argv) {
    const { servers, ...params } = argv
    servers.forEach(async name => {
      const availables = await glob('**', { deep: 0, cwd: 'app/servers', onlyFiles: false })
      if (availables.includes(name)) {
        const server = await import(`../servers/${name}`)
        server.start({
          ...params,
          port: params.port || config.app.get(`servers.${name}.port`)
        })
      }
    })
  }
}).exec()
