import { Alert, Divider, Popconfirm } from 'antd';
import React from 'react';
import { DecoratorsTableBody } from 'wtm/components/table/tableBody';
import Store from '../store';

/**
 * 组件继承 支持重写,
 */
@DecoratorsTableBody({
    Store: Store
})
export default class BodyComponent extends React.Component<any, any> {
    render() {
        return  <Alert
        showIcon
        message="装饰器测试"
        type="warning"
        closable
      />
    }
}
/**
 * 重写 按钮渲染示例
 */
class ActionComponent extends React.Component<{ Store: any, data: any }, any> {
    Store = this.props.Store;
    async onDelete() {
        let data = await this.Store.onDelete([this.props.data])
        if (data) {
            this.Store.onSearch();
        }
    }
    render() {
        return (
            <>
                <a onClick={this.Store.onModalShow.bind(this.Store, this.props.data)} >修改</a>
                <Divider type="vertical" />
                <Popconfirm title="Sure to delete?" onConfirm={this.onDelete.bind(this)} >
                    <a >删除</a>
                </Popconfirm>
            </>
        );
    }
}