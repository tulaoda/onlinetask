import { Form } from 'antd';
import DataEntry from 'components/table/dataEntry';
import * as React from 'react';
import { DecoratorsTableEdit } from 'wtm/components/table/tableEdit';
import Store from '../store';
const FormItem = Form.Item;
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
@DecoratorsTableEdit(Store)
export default class EditComponent extends React.Component<any, any>{
    render() {
        const { form, initialValue } = this.props;
        const { getFieldDecorator } = form;
        return <>
            {{{EditFormItem insert}}}
        </>
    }
}