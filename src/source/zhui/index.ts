/// <reference path="../../typings/zhui.d.ts" />

import Request from '../../utils/request'
import { errorCapture } from '../../utils'
import log from '../../utils/log'
interface IZhui {
    
}

class Zhui implements IZhui {
    request: Request
    constructor() {
        this.request = new Request('http://api.zhuishushenqi.com')
    }
    async fetch(url, ...args: any[]) {
        let [res, err] = await errorCapture(this.request.fetch.bind(this.request), url, ...args)
        if(err) {
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
    async 


    async test() {
        // this.getStatistics()
        var b = await this.getCategories({
            gender: 'male',
            type: 'hot',
            major: '玄幻',
            minor: '',
            start: 0,
            limit: 20
        })
        console.log(b)
    }
}

export default Zhui