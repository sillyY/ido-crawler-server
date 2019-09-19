/// <reference path="../../typings/zhui.d.ts" />

import Request from '../../utils/request'
import Log from '../../utils/log'
import { errorCapture } from '../../utils'

const log = new Log() 
log.withTag('Zhui-Service')

interface IZhui {}

class Zhui implements IZhui {
  request: Request
  constructor() {
    this.request = new Request('http://api.zhuishushenqi.com')
  }
  async fetch(url, ...args: any[]) {
    let [res, err] = await errorCapture(
      this.request.fetch.bind(this.request),
      url,
      ...args
    )
    if (err) {
      log.error(err)
    }
    return res
  }
  async getStatistics() {
    return await this.fetch('/cats/lv2/statistics')
  }
  async getCategories(params: Zhui.TCategoriesParams) {
    return await this.fetch('/book/by-categories', params)
  }
  async getCats() {
    return await this.fetch('/cats/lv2')
  }
  async getSource(id) {
    return await this.fetch('/toc', { view: 'summary', book: id })
  }

  async test() {
    var d = await this.getSource('53e56ee335f79bb626a496c9')
    log.success(d)
  }
}

export default Zhui
