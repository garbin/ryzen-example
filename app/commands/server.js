import { command } from 'ryzen'
import config from '../../deploy/config'
import glob from 'fast-glob'

command({
  command: '$0 [servers...]',
  builder: {
    servers: {
      default: ['spa']
    }
  },
  describe: 'start servers',
  handler (argv) {
    argv.servers.forEach(async name => {
      const servers = await glob('**', { deep: 0, cwd: 'app/servers', onlyFiles: false })
      if (servers.includes(name)) {
        const server = await import(`../servers/${name}`)
        server.start(config.app.get(`servers.${name}.port`), function () {
          console.log(`Server has started on port ${this.address().port}`)
        })
      }
    })
  }
}).exec()
