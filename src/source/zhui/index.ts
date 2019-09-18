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
    async getStatistics() {
        let [res, err] = await errorCapture(this.request.fetch.bind(this.request), '/cats/lv2/statistics')
        if(err) {
            log.error(err)
        }
        return res
    }
}

export default Zhui