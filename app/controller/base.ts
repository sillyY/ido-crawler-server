const { Controller } = require('egg')
export default class BaseController extends Controller {
  get user() {
    return this.ctx.session.user
  }

  success(data) {
    this.ctx.body = {
      code: 10000,
      success: true,
      data,
      error: ''
    }
  }

  error(code, msg, err?:any) {
    /**
     * TODO
     * - [×] 日志记录真实错误 err
     */
    if(err) console.log(err)
    
    this.ctx.body = {
      code,
      success: false,
      data: {},
      error: msg
    }
  }

  notFound(msg) {
    msg = msg || 'not found'
    this.ctx.throw(404, msg)
  }
}
