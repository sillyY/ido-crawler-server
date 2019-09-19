import * as moment from 'moment'
import chalk from 'chalk'

const log = console.log
const _toString = Object.prototype.toString

// 是否是有效对象
export function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

class Log {
  time() {
    return moment().format('YYYY-MM-DD HH:mm:ss')
  }
  success(msg) {
    log(
      `[✔] ${chalk.whiteBright(this.time())} ${chalk.green(
        msg !== null && typeof msg === 'object' ? JSON.stringify(msg) : msg
      )}`
    )
  }
  error(e) {
    log(
      `[✖] ${chalk.whiteBright(this.time())} ${chalk.red(
        e !== null && typeof e === 'object' ? JSON.stringify(e) : e
      )}`
    )
  }
  fatal(e) {
    log(
      `[☠] ${chalk.whiteBright(this.time())} ${chalk.red.bold(
        e !== null && typeof e === 'object' ? JSON.stringify(e) : e
      )}`
    )
  }
  warning(msg) {
    log(
      `[⚠] ${chalk.whiteBright(this.time())} ${chalk.yellow(
        msg !== null && typeof msg === 'object' ? JSON.stringify(msg) : msg
      )}`
    )
  }
  info(msg) {
    log(
      `[ℹ] ${chalk.whiteBright(this.time())} ${chalk.blue(
        msg !== null && typeof msg === 'object' ? JSON.stringify(msg) : msg
      )}`
    )
  }
}

export default new Log()
