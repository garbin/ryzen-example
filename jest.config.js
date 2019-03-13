module.exports = {
  verbose: true,
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/'],
  transform: {
    '\\.jsx': '<rootDir>/tests/config/client.transform.js',
    '\\.m?js$': '<rootDir>/tests/config/server.transform.js'
  },
  setupFilesAfterEnv: [ '<rootDir>/tests/config/server.setup.js' ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/tests/config/mocks/file.js',
    '\\.(css|less|scss)$': '<rootDir>/tests/config/mocks/file.js'
  },
  setupFiles: [
    '<rootDir>/tests/config/client.setup.js'
  ]
}
