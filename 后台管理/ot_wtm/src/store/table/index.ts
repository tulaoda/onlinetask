import StoreBasice from 'wtm/core/StoreBasice';
/**
 * 不要直接修改 wtm 组件 使用继承重写的方式修改
 */
export default class TableStore extends StoreBasice {
    constructor(public StoreConfig) {
        super(StoreConfig)
    }
}