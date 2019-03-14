require = require('esm')(module)
const casual = require('casual')
exports.seed = async function () {
  const { Post } = require('../../../app/models')
  await Post.query().insert({ title: casual.title, contents: casual.string })
}
