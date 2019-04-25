/**
*
* @title 嵌套子表格
* @parent 扩展行 Expanded Row
* @description 通过expandedRowRender参数来实现子表格
* demo1101
*/

import React, { Component } from "react";
import { Popconfirm } from 'tinper-bee';
import Table from "../../src";
import dragColumn from '../../src/lib/dragColumn';
const DragColumnTable = dragColumn(Table);
const columns16 = [
  {
    title: "操作",
    dataIndex: "d",
    key: "d", 
    width:200,
    render(text, record, index) {
      return (
        <Popconfirm trigger="click" placement="right" content={'这是第' + index + '行，内容为:' + text}>
          <a href="javascript:;" tooltip={text} >
          一些操作
          </a>
        </Popconfirm>
      );
    }
  },
  { title: "订单编号", dataIndex: "a", key: "a", width: 250 },
  { id: "123", title: "单据日期", dataIndex: "b", key: "b", width: 100 },
  { title: "供应商", dataIndex: "c", key: "c", width: 200 },
  
];
const columns17 = [
  {
    title: "操作",
    dataIndex: "d",
    key: "d",
    width:200,
    render(text, record, index) {
      return (
        <Popconfirm trigger="click" placement="right" content={'这是第' + index + '行，内容为:' + text}>
          <a href="javascript:;" tooltip={text} >
          一些操作
          </a>
        </Popconfirm>
      );
    }
  },
  { title: "订单编号", dataIndex: "a", key: "a", width: 100 },
  { id: "123", title: "单据日期", dataIndex: "b", key: "b", width: 100 },
  { title: "供应商", dataIndex: "c", key: "c", width: 200 },
  
];

const data16 = [
  { a: "NU0391001", b: "2019-03-01", c: "xx供应商", d: "操作", key: "1" },
  { a: "NU0391002", b: "2018-11-02", c: "yy供应商", d: "操作", key: "2" },
  { a: "NU0391003", b: "2019-05-03", c: "zz供应商", d: "操作", key: "3" }
];


class Demo16 extends Component {
  constructor(props){
    super(props);
    this.state={
      data_obj:{}
    }
  }
  expandedRowRender = (record, index, indent) => {
    let height = 42 * (this.state.data_obj[record.key].length+ 2);
    
    return (
      <Table
        columns={columns17}
        style={{height:height}}
        data={this.state.data_obj[record.key]} 
       
      />
    );
  };
  getData=(expanded, record)=>{
    //当点击展开的时候才去请求数据
    let new_obj = Object.assign({},this.state.data_obj);
    if(expanded){
      if(record.key==='1'){
        new_obj[record.key] = [
          { a: "NU0391056", b: "2019-03-01", c: "gys1", d: "操作", key: "1" },
          { a: "NU0391057", b: "2018-11-02", c: "gys2", d: "操作", key: "2" },
        ]
        this.setState({
          data_obj:new_obj
        })
      }else{
        new_obj[record.key] = [
          { a: "NU0391079", b: "2019-04-17", c: "gys5", d: "操作", key: "3" },
        ]
        this.setState({
          data_obj:new_obj
        })
      }
    }
  }
  haveExpandIcon=(record, index)=>{
    //控制是否显示行展开icon，该参数只有在和expandedRowRender同时使用才生效
    if(index == 0){
      return true;
    }
    return false;
  }
  render() {
    return (
      <DragColumnTable
        columns={columns16}
        data={data16}
        onExpand={this.getData}
        expandedRowRender={this.expandedRowRender}
        scroll={{x:true}}
        dragborder={true} 
        draggable={true} 
      />
    );
  }
}

export default Demo16;
