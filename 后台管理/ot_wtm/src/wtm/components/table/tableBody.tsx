/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2018-09-12 18:53:22
 * @modify date 2018-09-12 18:53:22
 * @desc [description]
*/
import { Divider, Popconfirm, Row, Table, Alert } from 'antd';
import Store from '../../core/StoreBasice';
import { observer } from 'mobx-react';
import moment from 'moment';
import * as React from 'react';
import lodash from 'lodash';
import { Resizable } from 'react-resizable';
import "./style.less";
import ReactDOM from 'react-dom';
import Rx, { Observable, Subscription } from 'rxjs';
interface ITableBody {
  /** 状态 */
  Store: Store,
  /**
  *  处理 表格类型输出
  * @param column 
  * @param index 
  */
  columnsMap?: (column: any, index: any, width: any) => any;
  /** 操作选项 */
  renderAction?: (text, record) => React.ReactElement<any>;
}
/**
 * 表格渲染组件 
 * 
 * 不要直接修改 wtm 组件 使用继承重写的方式修改
 */
@observer
export default class TableBodyComponent extends React.Component<ITableBody, any> {

  Store = this.props.Store;
  /**
   * 初始化列参数配置
   */
  initColumns() {
    if (this.rowDom && this.rowDom.clientWidth) {
      const width = Math.floor(this.rowDom.clientWidth / (this.Store.SwaggerModel.columns.length + 1))
      this.Store.SwaggerModel.onColumnsUpdate(this.Store.SwaggerModel.columns.map((col, index) => {
        return this.columnsMap(col, index, width)
      }))
    }
  }
  /**
  *  处理 表格类型输出
  * @param column 
  * @param index 
  */
  columnsMap(column, index, width) {
    if (this.props.columnsMap) {
      return this.props.columnsMap(column, index, width);
    }
    switch (column.format) {
      // 转换时间类型 输出
      case 'date-time':
        column.render = (record) => {
          try {
            if (record == null || record == undefined) {
              return "";
            }
            return moment(record).format(this.Store.Format.dateTime)
          } catch (error) {
            return error.toString()
          }
        }
        break;
      default:
        column.render = (record) => {
          try {
            return record.toString()
          } catch (error) {
            return error.toString()
          }
        }
    }
    console.log(column);
    return {
      ...column,
      sorter: true,
      width: width,
      // 列拖拽
      onHeaderCell: col => ({
        width: col.width,
        onResize: this.handleResize(index),
      }),
    }
  }
  /**
   * 选项
   * @param text 
   * @param record 
   */
  renderAction(text, record) {
    if (this.props.renderAction) {
      return this.props.renderAction(text, record);
    }
    return <ActionComponent {...this.props} data={record} />;
  }
  /**
   * 分页、排序、筛选变化时触发
   * @param page 
   * @param filters 
   * @param sorter 
   */
  onChange(page, filters, sorter) {
    let sort="";
    if (sorter.columnKey) {
      if (sorter.order=='descend') {
        sort=`${sorter.columnKey} desc`
      }else{
        sort=`${sorter.columnKey} asc`
      }
    }
    this.Store.onSearch({}, sort, page.current, page.pageSize)
  }

  /**
   * 覆盖默认的 table 元素
   */
  private components = {
    header: {
      cell: (props) => {
        const { onResize, width, ...restProps } = props;

        if (!width) {
          return <th {...restProps} />;
        }

        return (
          <Resizable width={width} height={0} onResize={onResize}>
            <th {...restProps} />
          </Resizable>
        );
      },
    },
  };
  /**
   * 拖拽
   */
  private handleResize = index => (e, { size }) => {
    let column = {
      ...this.Store.SwaggerModel.columns[index],
      width: size.width,
    }
    this.Store.SwaggerModel.onColumnsUpdate([
      ...this.Store.SwaggerModel.columns.slice(0, index),
      column,
      ...this.Store.SwaggerModel.columns.slice(index + 1, this.Store.SwaggerModel.columns.length),
    ])
    // console.log(this.columns);
    // this.forceUpdate();
  };
  resize: Subscription;
  private rowDom: HTMLDivElement;
  componentDidMount() {
    this.Store.onSearch({}, "", this.Store.dataSource.pageNo, this.Store.dataSource.pageSize);
    this.initColumns();
    // 窗口变化重新计算列宽度
    this.resize = Rx.Observable.fromEvent(window, "resize").debounceTime(800).subscribe(e => {
      this.initColumns();
      // this.forceUpdate();
    });
  }
  componentWillUnmount() {
    this.resize.unsubscribe();
  }
  render() {
    const dataSource = this.Store.dataSource;
    /**
    * 行选择
    */
    const rowSelection = {
      selectedRowKeys: this.Store.selectedRowKeys,
      onChange: e => this.Store.onSelectChange(e),
    };
    const columns = this.Store.SwaggerModel.columns.slice();
    columns.push({
      title: 'Action',
      dataIndex: 'Action',
      render: this.renderAction.bind(this),
    })
    if (dataSource.list) {
      return (
        <Row ref={e => this.rowDom = ReactDOM.findDOMNode(e) as any}>
          <Divider />
          <Table
            bordered
            components={this.components}
            dataSource={dataSource.list.slice()}
            onChange={this.onChange.bind(this)}
            columns={columns}
            rowSelection={rowSelection}
            loading={this.Store.pageState.loading}
            pagination={
              {
                // hideOnSinglePage: true,//只有一页时是否隐藏分页器
                position: "top",
                showSizeChanger: true,//是否可以改变 pageSize
                pageSize: dataSource.pageSize,
                current: dataSource.pageNo,
                defaultPageSize: dataSource.pageSize,
                defaultCurrent: dataSource.pageNo,
                total: dataSource.count
              }
            }
          />
        </Row>
      );
    } else {
      return <div>
        <Divider />
        <Alert
          showIcon
          message="数据格式并非table标准格式请使用其他模板或者检查接口数据是否有误"
          type="warning"
          closable
        />
      </div>
    }

  }
}
/**
 * 数据操作按钮
 */
class ActionComponent extends React.Component<{ Store: Store, data: any }, any> {
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
        {this.Store.Actions.update.state ? <a onClick={this.Store.onModalShow.bind(this.Store, this.props.data)} >修改</a> : null}
        <Divider type="vertical" />
        {this.Store.Actions.delete.state ?
          <Popconfirm title="Sure to delete?" onConfirm={this.onDelete.bind(this)} >
            <a >删除</a>
          </Popconfirm> : null}


      </>
    );
  }
}
/**
 * table 装饰器
 * @param params 
 */
export function DecoratorsTableBody(params: ITableBody) {
  return function <T extends { new(...args: any[]): {} }>(Component: any) {
    return class extends React.Component<any, any> {
      render() {
        return <>
          <TableBodyComponent {...params} />
          <Component {...params} />
        </>
      }
    }
  }
}