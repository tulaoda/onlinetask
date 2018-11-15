/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2018-09-12 18:52:42
 * @modify date 2018-09-12 18:52:42
 * @desc [description]
*/
import { runInAction } from 'mobx';
import Rx from "rxjs";
import Http from './HttpBasics';
/**
 * 公共数据接口
 */
class Common {
    constructor() {
        // console.log("Common", this);
        this.getCustomColumn();
    }
    /** 列获取完成通知 */
    CustomColumnSubject = new Rx.BehaviorSubject<any>([]);
    /** 缓存 http 请求 */
    CacheHttp = new Map<string, Promise<any>>();
    /** 缓存数据 */
    Cache = new Map<string, any>();
    /** 获取 公共数据 */
    async getCombo(parmas: WTM.ICommon) {
        const key = JSON.stringify(parmas)
        if (this.Cache.has(key)) {
            return this.Cache.get(key);
        }
        let promise: Promise<any>// = Http.get(this.address + parmas.address, parmas.params).toPromise();
        if (this.CacheHttp.has(key)) {
            promise = this.CacheHttp.get(key);
        } else {
            promise = Http.get(parmas.address, parmas.params).toPromise();
            // promise = new Promise((resolve, reject) => {
            //     setTimeout(() => {
            //         const list = [];
            //         for (let index = 0; index < 10; index++) {
            //             list.push({
            //                 key: index,
            //                 value: "value" + index
            //             })
            //         }
            //         resolve(list);
            //     }, 1000);
            // })
            this.CacheHttp.set(key, promise);
        }
        const data = await promise || [];
        this.Cache.set(key, data);
        return data;
    }


    /**
     * 获取列配置
     */
    async getCustomColumn() {
        const data = await Http.get("/common/getCustomColumn").toPromise();
        // setTimeout(() => {
        //     this.CustomColumnSubject.next([
        //         {
        //             entity: "test",
        //             columns: ["corpName","parentCorpID"]
        //         }
        //     ])
        // }, 2000);
        runInAction(() => {
            if (data && data.length > 0) {
                this.CustomColumnSubject.next(data)
            }
        })
    }
    /**
     * 设置列配置
     */
    async setCustomColumn(params) {
        await Http.post("/common/setCustomColumn", params).toPromise();
    }
}
export default new Common();
