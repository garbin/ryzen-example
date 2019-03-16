module.exports = {
  apps: [
    {
      name: 'api',
      script: './app/commands/server.js',
      args: 'api',
      node_args: '-r esm',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'ssr',
      script: './app/commands/server.js',
      instances: 'max',
      args: 'ssr',
      node_args: '-r esm',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'spa',
      script: './app/commands/server.js',
      args: 'spa',
      node_args: '-r esm',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'scheduler',
      script: './app/commands/server.js',
      args: 'scheduler --jobs example',
      node_args: '-r esm',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'queue',
      script: './app/commands/server.js',
      args: 'queue --workers sendmail example',
      node_args: '-r esm',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
}
