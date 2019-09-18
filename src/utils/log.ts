import * as moment from 'moment'
import chalk from 'chalk'

const log = console.log

class Log {
  time() {
    return moment().format('YYYY-MM-DD HH:mm:ss')
  }
  success(msg) {
    log(
      `[✔] ${chalk.whiteBright(this.time())} ${chalk.green(
        msg
      )}`
    )
  }
  error(e) {
    log(`[✖] ${chalk.whiteBright(this.time())} ${chalk.red(
        e
      )}`)
  }
  fatal(e) {
    log(`[☠] ${chalk.whiteBright(this.time())} ${chalk.red.bold(
        e
      )}`)
  }
  warning(msg) {
    log(`[⚠] ${chalk.whiteBright(this.time())} ${chalk.yellow(
        msg
      )}`)
  }
  info(msg) {
    log(`[ℹ] ${chalk.whiteBright(this.time())} ${chalk.blue(
        msg
      )}`)
  }
}

export default new Log()
