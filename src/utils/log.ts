import * as moment from 'moment'
import chalk from 'chalk'

const log = console.log
const _toString = Object.prototype.toString

// 是否是有效对象
export function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

class Log {
  tip = ''
  withTag(tip: string): void {
    this.tip = tip
  }
  time() {
    return moment().format('YYYY-MM-DD HH:mm:ss')
  }
  success(msg) {
    let tip = this.tip ? ` [${this.tip}] `: ' '
    log(
      `[✔]${tip}${chalk.whiteBright(this.time())} ${chalk.green(
        msg !== null && typeof msg === 'object' ? JSON.stringify(msg) : msg
      )}`
    )
  }
  error(e) {
    let tip = this.tip ? ` [${this.tip}] `: ' '
    log(
      `[✖]${tip}${chalk.whiteBright(this.time())} ${chalk.red(
        e !== null && typeof e === 'object' ? JSON.stringify(e) : e
      )}`
    )
  }
  fatal(e) {
    let tip = this.tip ? ` [${this.tip}] `: ' '
    log(
      `[☠]${tip}${chalk.whiteBright(this.time())} ${chalk.red.bold(
        e !== null && typeof e === 'object' ? JSON.stringify(e) : e
      )}`
    )
  }
  warning(msg) {
    let tip = this.tip ? ` [${this.tip}] `: ' '
    log(
      `[⚠]${tip}${chalk.whiteBright(this.time())} ${chalk.yellow(
        msg !== null && typeof msg === 'object' ? JSON.stringify(msg) : msg
      )}`
    )
  }
  info(msg) {
    let tip = this.tip ? ` [${this.tip}] `: ' '
    log(
      `[ℹ]${tip}${chalk.whiteBright(this.time())} ${chalk.blue(
        msg !== null && typeof msg === 'object' ? JSON.stringify(msg) : msg
      )}`
    )
  }
}

export default Log
