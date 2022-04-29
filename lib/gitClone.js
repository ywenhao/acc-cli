const download = require('download-git-repo')
const path = require('path')
const rimraf = require('rimraf')
const { stopSpinner } = require('./spinner')

async function cloneGit(dirName, gitName, callback) {
  const dir = path.join(process.cwd(), dirName) //这里可以自定义下载的地址
  console.log('dir' + dir)
  rimraf.sync(dir, {}) //在下载前需要保证路径下没有同名文件

  return download(
    'direct:http://117.139.13.157:9000/webDeveloper/' + gitName + '.git',
    dir,
    { clone: true },
    callback
  )
}
module.exports = (...args) => {
  return cloneGit(...args).catch((err) => {
    stopSpinner(false) // do not persist
  })
}
