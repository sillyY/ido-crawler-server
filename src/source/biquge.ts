/// <reference path="../typings/biquge.d.ts" />
import * as cheerio from 'cheerio'
import ora from 'ora'
import * as sleep from 'sleep'

import Request from '../utils/request'
import Log from '../utils/log'
import { errorCapture, sliceArray } from '../utils'
import Major from '../database/major'
import Book from '../database/book'

const log = new Log()
log.withTag('Biquge-Service')

const BIQUGE_URL = 'http://www.xbiquge.la'


class Biquge {
  request: Request
  majors: NBiquge.IMajor[] = []
  books: NBiquge.IBook[] = []
  constructor() {
    this.request = new Request(BIQUGE_URL)
  }
  async init() {
    var major = new Major()
    major.setMajor()
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
    const res = await this.fetch('/xiaoshuodaquan/')

    const $ = cheerio.load(res),
      novellist = $('.novellist')

    let arr = [],
      i = 0,
      len = novellist.length

    for (; i < len; i++) {
      const children = novellist[i].children
      let opts: any = {
        major: '',
        books: []
      }
      $(children).each(function(i, element) {
        if (element.name === 'h2') {
          opts.major = $(this).text()
        } else if (element.name == 'ul') {
          const books = element.children
          $(books).each(function(idx, ele) {
            const text = $(this).text(),
              link = $(this)
                .find('a')
                .attr('href')
            if (text && text !== '\n\n') {
              opts.books.push({
                name: $(this).text(),
                link
              })
            }
          })
        }
        if (opts.major && opts.books.length) {
          arr.push(opts)
        }
      })
    }

    // 拆分major
    for (let value of arr) {
      let major = value.major.replace(/大全列表/g, '').replace(/小说/g, '')
      let stats = major.split('、')

      let i = 0,
        len = stats.length

      for (; i < len; i++) {
        this.majors.push({
          major: stats[i],
          totals: value.books.length
        })
        value.books.map(v => this.books.push({ ...v, ...{ major: stats[i] } }))
      }
    }
    console.log(this.majors)
    console.log(this.books)
  }

  async getChapters(link) {
    let arr = []
    const res = await this.fetch(link)

    const $ = cheerio.load(res),
      chapters = $('#list dl').children()

    $(chapters).each(function(index, element) {
      const name = $(this).text(),
        link = $(this)
          .find('a')
          .attr('href')
      arr.push({
        name,
        link: BIQUGE_URL + link
      })
    })

    return arr
  }
  async getContent(link) {
    const res = await this.fetch(link)

    const $ = cheerio.load(res),
      content = $('#content').text()
    return content
  }
}

export default new Biquge()
