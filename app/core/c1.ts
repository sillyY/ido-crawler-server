/**
 * 爬虫1号crawler-1
 * 链接：https://www.biquge.com.cn
 *
 */
/// <reference path="../../typings/app/core/c1.d.ts" />
import axios from 'axios'
import * as cheerio from 'cheerio'
import Crawler from './index'
import { errorCaptured } from '../extend/helper'
import { config } from './config'

const { BASE_URL, SEARCH_SUFFIX } = config.c1

class C1 extends Crawler {
  private each(nodes, callback) {
    // @ts-ignore
    nodes.each((idx, ele) => {
      callback(ele)
    })
  }
  private formatProp(prop: string) {
    return prop && prop.replace('\n', '').replace(/(^\s*)|(\s*$)/g, '')
  }
  private getBook($, element) {
    let result: C1Module.Book = {}

    result.bookImg = $(element)
      .find('.result-game-item-pic-link-img')
      .attr('src')
    result.link = $(element)
      .find('.result-game-item-pic-link')
      .attr('href')
    result.title = this.formatProp(
      $(element)
        .find('.result-item-title')
        .text()
    )
    result.bookIntro = $(element)
      .find('.result-game-item-desc')
      .text()

    this.each(
      $(element).find(
        '.result-game-item-detail>.result-game-item-info .result-game-item-info-tag'
      ),
      ele => {
        let arr = $(ele)
          .find('.result-game-item-info-tag>span:last-child')
          .text()
        result.latestChapter = $(ele)
          .find('.result-game-item-info-tag-item')
          .text()
          .replace(/(^\s*)|(\s*$)/g, '')
        result.author = this.formatProp(arr[0])
        result.major = this.formatProp(arr[1])
        result.update = this.formatProp(arr[2])
      }
    )
    return result
  }

  public search(query) {
    return new Promise(async (resolve, reject) => {
      let result: C1Module.Book[] = []
      let [res, err] = await errorCaptured(
        axios,
        BASE_URL + SEARCH_SUFFIX + encodeURIComponent(query)
      )
      if (err) reject(err)
      const $ = cheerio.load(res.data)

      this.each($('.result-list .result-item'), element => {
        result.push(this.getBook($, element))
      })
      resolve(result)
    })
  }
  public async getChapter(link) {
    return new Promise(async (resolve, reject) => {
      let result: C1Module.Chapter[] = []
      let [res, err] = await errorCaptured(axios, link)
      if (err) reject(err)

      const $ = cheerio.load(res.data)
      this.each($('#list dl dd'), element => {
        const title = $(element).text(),
          href =
            BASE_URL +
            $(element)
              .find('a')
              .attr('href')
        result.push({
          title,
          href
        })
      })
      resolve(result)
    })
  }

  public async getContent(link) {
    return new Promise(async (resolve, reject) => {
      const [res, err] = await errorCaptured(axios, link)
      if (err) reject(err)

      let $ = cheerio.load(res.data)
      resolve({
        bookname: $('.bookname h1').text(),
        link,
        content: $('#content').text()
      })
    })
  }
}

export default new C1()
