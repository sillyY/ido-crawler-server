/**
 * 服务器异常
 */
export const SERVER_CONNECT_ERROR = 10001

/**
 * 被爬虫网站异常
 */
export const CRAWLER_CONNECT_ERROR = 20001

/**
 * 接口异常
 */
export const VERIFY_PARAMS_ERROR = 30001

export const errors = {
  /**
   * 被爬虫网站异常
   */
  CRAWLER_CONNECT_ERROR: {
    code: 20001,
    msg: '小说网站链接异常'
  },
  CRAWLER_CHAPTER_CONNECT_ERROR: {
    code: 20002,
    msg: '小说章节网站链接异常'
  },
  CRAWLER_CONTENT_CONNECT_ERROR: {
    code: 20003,
    msg: '小说正文网站链接异常'
  },

  /**
   * 接口异常
   */
  VERIFY_PARAMS_ERROR: {
    code: 30001,
    msg: '参数错误'
  }
}
