import { HttpBasics } from 'wtm/core/HttpBasics';
export class Request extends HttpBasics {
    /**
     * 
     * @param address 替换默认地址前缀
     * @param newResponseMap 替换默认过滤函数
     */
    constructor(address?, public newResponseMap?) {
        super(address, newResponseMap)
    }

}
export default new Request();