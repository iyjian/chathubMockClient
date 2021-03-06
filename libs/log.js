const log4js = require('log4js')
const path = require('path')

try {
  // require('fs').mkdirSync('./logs')
} catch (e) {
  if (e.code !== 'EEXIST') {
    console.error('Could not set up log directory, error: ', e)
    process.exit(1)
  }
}

try {
  log4js.configure(path.resolve(__dirname, '../conf/log4j.json'))
} catch (e) {
  console.error('载入log4js日志输出配置错误: ', e)
  process.exit(1)
}

const log = log4js.getLogger('rpc')
module.exports = log
