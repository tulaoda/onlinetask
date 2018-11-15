/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2018-09-12 18:53:18
 * @modify date 2018-09-12 18:53:18
 * @desc [description]
*/
import { DatePicker, Input, InputNumber, Select, Spin } from 'antd';
import Store from '../../core/StoreBasice';
import moment from 'moment';
import * as React from 'react';
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
export interface IDataEntryProps {
    Store?: Store;
    format?: string;
    example?: any;
    common?: WTM.ICommon;
    // 表单组件传递
    placeholder?: string;
    onChange?: (value: any) => void;
    value?: any;
    defaultValue?: any;
}
/**
 * 数据渲染组件
 * 不要直接修改 wtm 组件 使用继承重写的方式修改
 * 自定义数据组件
 * https://ant.design/components/form-cn/#components-form-demo-customized-form-controls
 */
export default class DataEntry extends React.Component<IDataEntryProps, any> {
    Store = this.props.Store;
    state = { error: null, errorInfo: null };
    componentDidCatch(error, info) {
        this.setState({
            error: error,
            errorInfo: info
        })
    }
    shouldComponentUpdate() {
        return false
    }
    render() {
        if (this.state.errorInfo) {
            return (
                <div>
                    <h2>组件出错~</h2>
                </div>
            );
        }
        const { example, common, Store, format, placeholder, onChange, value } = this.props;
        // 传递 from 高阶组件中的 onchange 事件 和其他属性
        let GetFieldDecoratorOptions: any = {
            onChange,
            defaultValue: value,
            placeholder: placeholder
        }
        // 远程 数据选择
        if (common && common.address) {
            return <DataEntrySelect {...this.props} {...GetFieldDecoratorOptions} />
        }
        // 日期选择
        if (example && example.date === true) {
            return <DatePicker showTime format={Store.Format.dateTime} {...GetFieldDecoratorOptions} />
        }
        // 日期区选择
        if (example && example.datetime === true) {
            GetFieldDecoratorOptions.placeholder = [GetFieldDecoratorOptions.placeholder, GetFieldDecoratorOptions.placeholder]
            return <>
                <RangePicker showTime format={Store.Format.dateTime} {...GetFieldDecoratorOptions} />
            </>
        }
        switch (format) {
            // 日期
            case "date-time":
                return <DatePicker
                    showTime
                    format={Store.Format.dateTime}
                    {...GetFieldDecoratorOptions} />
            // 数字
            case "int32":
                return <InputNumber {...GetFieldDecoratorOptions} />
            // 默认文本
            default:
                return <Input type="text" {...GetFieldDecoratorOptions} />
        }
    }
}
/**
 * 远程 获取列表
 */
export class DataEntrySelect extends React.Component<IDataEntryProps, any> {
    Store = this.props.Store;
    state = {
        loading: !this.Store.Common.Cache.has(JSON.stringify(this.props.common)),
        data: [],
        error: null, errorInfo: null
    }
    componentDidCatch(error, info) {
        this.setState({
            error: error,
            errorInfo: info
        })
    }
    async componentDidMount() {
        const data = await this.Store.Common.getCombo(this.props.common)
        this.setState({
            loading: false,
            data: data
        })
    }
    onChange(event) {
        // 多选使用 ，连接
        if (this.props.example && this.props.example.multi) {
            event = event.join(",")
        }
        this.props.onChange(event);
    }
    render() {
        if (this.state.errorInfo) {
            return (
                <div>
                    <h2>组件出错~</h2>
                </div>
            );
        }
        let config = {
            mode: "multiple",
            onChange: this.onChange.bind(this),
            tokenSeparators: [','],
            placeholder: this.props.placeholder,
            defaultValue: this.props.defaultValue
        }
        // 非多选，删除多选属性
        if (this.props.example && !this.props.example.multi) {
            delete config.mode;
        } else {
            // 多选默认值 拆分数组
            if (config.defaultValue == "") {
                delete config.defaultValue;
            }
            if (typeof config.defaultValue == "string") {
                config.defaultValue = config.defaultValue.split(",")
            }
        }
        return (
            <Spin spinning={this.state.loading}>
                <Select
                    {...config}
                >
                    {this.state.data.map(x => <Option key={x.value}>{x.name}</Option>)}
                </Select>
            </Spin>

        );
    }
}

