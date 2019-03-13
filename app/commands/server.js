import { command } from 'ryzen'
import config from '../../deploy/config'

command({
  command: '$0 [servers...]',
  builder: {
    servers: {
      default: ['app']
    }
  },
  describe: 'start servers',
  handler (argv) {
    argv.servers.forEach(async name => {
      const server = await import(`../servers/${name}`)
      if (['api', 'app'].includes(name)) {
        server.start(config.app.get('port'), function () {
          console.log(`Server has started on port ${this.address().port}`)
        })
      }
    })
  }
}).exec()
