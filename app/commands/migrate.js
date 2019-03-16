import { command } from 'ryzen'
import path from 'path'
import sh from 'shelljs'
import fs from 'fs'
import glob from 'fast-glob'

command({
  command: '$0 [action]',
  builder: {
    action: { default: 'install' }
  },
  describe: 'build clients',
  handler (argv) {
    argv.clients.forEach(async name => {
      const clients = await glob('**', { deep: 0, cwd: 'app/clients', onlyFiles: false })
      if (clients.includes(name)) {
        if (argv.locales.length) {
          // build locale only
          argv.locales.forEach(locale => {
            sh.exec(`extract-messages -l '${locale}' -d '${locale}' -o app/clients/${name}/locales --flat 'app/clients/${name}/**/*.jsx'`)
            sh.echo(`locale ${locale} of client ${name} build successfully`)
          })
        } else {
          // build code
          if (fs.existsSync(path.resolve(__dirname, `../clients/${name}/next.config.js`))) {
          // ssr
            sh.exec(`next build ./app/clients/${name}`)
          } else {
          // spa
            sh.exec(`webpack --config app/clients/${name}/webpack.config.js`)
          }
        }
      }
    })
  }
}).exec()
