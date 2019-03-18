import { command } from 'ryzen'
import cluster from 'cluster'
import config from '../../deploy/config'
import os from 'os'
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
    cluster: { default: process.env.NODE_ENV === 'production', alias: 'c', type: 'boolean' }
  },
  describe: 'start servers',
  handler (argv) {
    const { servers, ...params } = argv

    servers.forEach(async name => {
      const availables = await glob('**', { deep: 0, cwd: 'app/servers', onlyFiles: false })
      if (availables.includes(name)) {
        const server = await import(`../servers/${name}`)
        server.cluster = server.cluster === false ? server.cluster : (server.cluster || defaultCluster)
        if (argv.cluster && server.cluster) {
          server.cluster(startServer.bind(this, name, server))
        } else {
          startServer(name, server)
        }
      }
    })

    function defaultCluster (startServer) {
      if (cluster.isMaster) {
        console.log(`Cluster enabled, Master ${process.pid} is running`)
        for (let i = 0; i < os.cpus().length; i++) cluster.fork()
        cluster.fork()
        cluster.on('exit', (worker, code, signal) => console.log(`worker ${worker.process.pid} died`))
      } else {
        startServer()
      }
    }

    function startServer (name, server) {
      server.start({
        ...params,
        port: params.port || config.app.get(`servers.${name}.port`)
      })
    }
  }
}).exec()
