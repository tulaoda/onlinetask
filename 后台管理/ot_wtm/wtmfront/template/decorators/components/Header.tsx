import { Col, Form } from 'antd';
import DataEntry from 'components/table/dataEntry';
import * as React from 'react';
import { DecoratorsTableHeader } from 'wtm/components/table/tableHeader';
import Store from '../store';
const FormItem = Form.Item;
const colLayout = {
    xl: 6,
    lg: 8,
    md: 12
}
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
/**
 * 组件继承 支持重写,
 */
@DecoratorsTableHeader(Store)
export default class HeaderComponent extends React.Component<any, any>{
    render() {
        const { form, initialValue } = this.props;
        const { getFieldDecorator } = form;
        return <>
                  {{{HeaderFormItem search}}}
        </>
    }
}

