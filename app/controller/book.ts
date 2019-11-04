import BaseController from './base'
import c1 from '../core/c1'
import { errors } from '../config/code'

export default class BookController extends BaseController {
  public async search() {
    const { ctx } = this
    // 校验参数
    const createRule = {
      keyword: 'string'
    }
    const valiErrors = this.app.validator.validate(
      createRule,
      ctx.request.query
    )
    if (valiErrors && valiErrors.length) {
      this.error(
        errors.VERIFY_PARAMS_ERROR.code,
        errors.VERIFY_PARAMS_ERROR.msg
      )
      return
    }

    const { keyword } = ctx.request.query

    // 设置响应内容和响应状态码
    try {
      const res = await c1.search(keyword)
      this.success(res)
    } catch (err) {
      this.error(
        errors.CRAWLER_CONNECT_ERROR.code,
        errors.CRAWLER_CONNECT_ERROR.msg
      )
    }
  }

  public async getChapter() {
    const { ctx } = this

    // 校检参数
    const createRule = {
      link: 'string'
    }
    const valiErrors = this.app.validator.validate(
      createRule,
      ctx.request.query
    )
    if (valiErrors && valiErrors.length) {
      this.error(
        errors.VERIFY_PARAMS_ERROR.code,
        errors.VERIFY_PARAMS_ERROR.msg
      )
      return
    }
    const { link } = ctx.request.query

    // 设置响应内容和响应状态码
    try {
      const res = await c1.getChapter(link)
      this.success(res)
    } catch (err) {
      this.error(
        errors.CRAWLER_CHAPTER_CONNECT_ERROR.code,
        errors.CRAWLER_CHAPTER_CONNECT_ERROR.msg
      )
    }
  }

  public async getContent() {
    const { ctx } = this

    // 校检参数
    const createRule = {
      link: 'string'
    }
    const valiErrors = this.app.validator.validate(
      createRule,
      ctx.request.query
    )
    if (valiErrors && valiErrors.length) {
      this.error(
        errors.VERIFY_PARAMS_ERROR.code,
        errors.VERIFY_PARAMS_ERROR.msg
      )
      return
    }

    const { link } = ctx.request.query

    // 设置响应内容和响应状态码
    try {
      const res = c1.getContent(link)
      this.success(res)
    } catch (err) {
      this.error(
        errors.CRAWLER_CONTENT_CONNECT_ERROR.code,
        errors.CRAWLER_CONTENT_CONNECT_ERROR.msg
      )
    }
  }
}
