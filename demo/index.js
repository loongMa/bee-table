
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Button from 'bee-button';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';


const CARET = <i className="uf uf-arrow-down"></i>;

const CARETUP = <i className="uf uf-arrow-up"></i>;


var Demo1 = require("./demolist/Demo1");var Demo10 = require("./demolist/Demo10");var Demo11 = require("./demolist/Demo11");var Demo12 = require("./demolist/Demo12");var Demo13 = require("./demolist/Demo13");var Demo14 = require("./demolist/Demo14");var Demo15 = require("./demolist/Demo15");var Demo2 = require("./demolist/Demo2");var Demo3 = require("./demolist/Demo3");var Demo4 = require("./demolist/Demo4");var Demo5 = require("./demolist/Demo5");var Demo6 = require("./demolist/Demo6");var Demo7 = require("./demolist/Demo7");var Demo8 = require("./demolist/Demo8");var Demo9 = require("./demolist/Demo9");var DemoArray = [{"example":<Demo1 />,"title":" 简单表格","code":"/**\n*\n* @title 简单表格\n* @description\n*\n*/\n\nimport React, { Component } from 'react';\nimport Table from 'bee-table';\n\n\nconst columns = [\n  { title: '用户名', dataIndex: 'a', key: 'a', width: 100 },\n  { id: '123', title: '性别', dataIndex: 'b', key: 'b', width: 100 },\n  { title: '年龄', dataIndex: 'c', key: 'c', width: 200 },\n  {\n    title: '操作', dataIndex: '', key: 'd', render() {\n      return <a href=\"#\">一些操作</a>;\n    },\n  },\n];\n\nconst data = [\n  { a: '令狐冲', b: '男', c: 41, key: '1' },\n  { a: '杨过', b: '男', c: 67, key: '2' },\n  { a: '郭靖', b: '男', c: 25, key: '3' },\n];\n\nclass Demo1 extends Component {\n    render () {\n        return (\n              <Table\n              columns={columns}\n              data={data}\n              title={currentData => <div>标题: 这是一个标题</div>}\n              footer={currentData => <div>表尾: 我是小尾巴</div>}\n              />\n        )\n    }\n}\n\n\n\n","desc":""},{"example":<Demo10 />,"title":" 无数据时显示","code":"/**\n*\n* @title 无数据时显示\n* @description 无数据时显示效果展示\n*\n*/\n\n\nimport React, { Component } from 'react';\nimport Table from 'bee-table';\n\n\nconst columns10 = [\n    {\n      title: \"Name\",\n      dataIndex: \"name\",\n      key: \"name\",\n      width: \"40%\"\n    },\n    {\n      title: \"Age\",\n      dataIndex: \"age\",\n      key: \"age\",\n      width: \"30%\"\n    },\n    {\n      title: \"Address\",\n      dataIndex: \"address\",\n      key: \"address\"\n    }\n  ];\n  \n  const data10 = [\n    \n  ];\n\n  const emptyFunc = () => <span>这里没有数据！</span>\n  \n  class Demo10 extends Component {\n    render() {\n      return <Table columns={columns10} data={data10} emptyText={emptyFunc} />;\n    }\n  }\n\n","desc":" 无数据时显示效果展示"},{"example":<Demo11 />,"title":" 列排序","code":"/**\n*\n* @title 列排序\n* @description 列排序\n*\n*/\n\n\nimport React, { Component } from 'react';\nimport Table from 'bee-table';\nimport Icon from \"bee-icon\";\n\nconst columns11 = [\n  {\n    title: \"名字\",\n    dataIndex: \"a\",\n    key: \"a\",\n    width: 100\n  },\n  {\n    title: \"性别\",\n    dataIndex: \"b\",\n    key: \"b\",\n    width: 100\n  },\n  {\n    title: \"年龄\",\n    dataIndex: \"c\",\n    key: \"c\",\n    width: 200,\n    sorter: (a, b) => a.c - b.c\n  },\n  {\n    title: \"操作\",\n    dataIndex: \"\",\n    key: \"d\",\n    render() {\n      return <a href=\"#\">一些操作</a>;\n    }\n  }\n];\n\nconst data11 = [\n  { a: \"杨过\", b: \"男\", c: 30, key: \"2\" },\n  { a: \"令狐冲\", b: \"男\", c: 41, key: \"1\" },\n  { a: \"郭靖\", b: \"男\", c: 25, key: \"3\" }\n];\n\nconst defaultProps11 = {\n  prefixCls: \"bee-table\"\n};\nclass Demo11 extends Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      sortOrder: \"\",\n      data: data11\n    };\n  }\n  toggleSortOrder=(order, column)=> {\n    let { sortOrder, data, oldData } = this.state;\n    let ascend_sort = function(key) {\n      return function(a, b) {\n        return a.key - b.key;\n      };\n    };\n    let descend_sort = function(key) {\n      return function(a, b) {\n        return b.key - a.key;\n      };\n    };\n    if (sortOrder === order) {\n      // 切换为未排序状态\n      order = \"\";\n    }\n    if (!oldData) {\n      oldData = data.concat();\n    }\n    if (order === \"ascend\") {\n      data = data.sort(function(a, b) {\n        return column.sorter(a, b);\n      });\n    } else if (order === \"descend\") {\n      data = data.sort(function(a, b) {\n        return column.sorter(b, a);\n      });\n    } else {\n      data = oldData.concat();\n    }\n    this.setState({\n      sortOrder: order,\n      data: data,\n      oldData: oldData\n    });\n  }\n  renderColumnsDropdown(columns) {\n    const { sortOrder } = this.state;\n    const { prefixCls } = this.props;\n\n    return columns.map(originColumn => {\n      let column = Object.assign({}, originColumn);\n      let sortButton;\n      if (column.sorter) {\n        const isAscend = sortOrder === \"ascend\";\n        const isDescend = sortOrder === \"descend\";\n        sortButton = (\n          <div className={`${prefixCls}-column-sorter`}>\n            <span\n              className={`${prefixCls}-column-sorter-up ${isAscend\n                ? \"on\"\n                : \"off\"}`}\n              title=\"↑\"\n              onClick={() => this.toggleSortOrder(\"ascend\", column)}\n            >\n              <Icon type=\"uf-triangle-up\" />\n            </span>\n            <span\n              className={`${prefixCls}-column-sorter-down ${isDescend\n                ? \"on\"\n                : \"off\"}`}\n              title=\"↓\"\n              onClick={() => this.toggleSortOrder(\"descend\", column)}\n            >\n              <Icon type=\"uf-triangle-down\" />\n            </span>\n          </div>\n        );\n      }\n      column.title = (\n        <span>\n          {column.title}\n          {sortButton}\n        </span>\n      );\n      return column;\n    });\n  }\n  render() {\n    let columns = this.renderColumnsDropdown(columns11);\n    return <Table columns={columns} data={this.state.data} />;\n  }\n}\nDemo11.defaultProps = defaultProps11;\n\n\n","desc":" 列排序"},{"example":<Demo12 />,"title":" 全选功能","code":"/**\n*\n* @title 全选功能\n* @description 全选功能\n*\n*/\n\n\nimport React, { Component } from 'react';\nimport Table from 'bee-table';\nimport Checkbox from \"bee-checkbox\";\n\nconst columns12 = [\n  {\n    title: \"名字\",\n    dataIndex: \"a\",\n    key: \"a\",\n    width: 100\n  },\n  {\n    title: \"性别\",\n    dataIndex: \"b\",\n    key: \"b\",\n    width: 100\n  },\n  {\n    title: \"年龄\",\n    dataIndex: \"c\",\n    key: \"c\",\n    width: 200,\n    sorter: (a, b) => a.c - b.c\n  },\n  {\n    title: \"操作\",\n    dataIndex: \"\",\n    key: \"d\",\n    render() {\n      return <a href=\"#\">一些操作</a>;\n    }\n  }\n];\n\nconst data12 = [\n  { a: \"杨过\", b: \"男\", c: 30, key: \"2\" },\n  { a: \"令狐冲\", b: \"男\", c: 41, key: \"1\" },\n  { a: \"郭靖\", b: \"男\", c: 25, key: \"3\" }\n];\n\nconst defaultProps12 = {\n  prefixCls: \"bee-table\",\n  multiSelect: {\n    type: \"checkbox\",\n    param: \"key\"\n  }\n};\nclass Demo12 extends Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      checkedAll:false,\n      checkedArray: [\n        false,\n        false,\n        false,\n      ],\n      data: data12\n    };\n  }\n  onAllCheckChange = () => {\n    let self = this;\n    let checkedArray = [];\n    let listData = self.state.data.concat();\n    let selIds = [];\n    // let id = self.props.multiSelect.param;\n    for (var i = 0; i < self.state.checkedArray.length; i++) {\n      checkedArray[i] = !self.state.checkedAll;\n    }\n    // if (self.state.checkedAll) {\n    //   selIds = [];\n    // } else {\n    //   for (var i = 0; i < listData.length; i++) {\n    //     selIds[i] = listData[i][id];\n    //   }\n    // }\n    self.setState({\n      checkedAll: !self.state.checkedAll,\n      checkedArray: checkedArray,\n      // selIds: selIds\n    });\n    // self.props.onSelIds(selIds);\n  };\n  onCheckboxChange = (text, record, index) => {\n    let self = this;\n    let allFlag = false;\n    // let selIds = self.state.selIds;\n    // let id = self.props.postId;\n    let checkedArray = self.state.checkedArray.concat();\n    // if (self.state.checkedArray[index]) {\n      // selIds.remove(record[id]);\n    // } else {\n      // selIds.push(record[id]);\n    // }\n    checkedArray[index] = !self.state.checkedArray[index];\n    for (var i = 0; i < self.state.checkedArray.length; i++) {\n      if (!checkedArray[i]) {\n        allFlag = false;\n        break;\n      } else {\n        allFlag = true;\n      }\n    }\n    self.setState({\n      checkedAll: allFlag,\n      checkedArray: checkedArray,\n      // selIds: selIds\n    });\n    // self.props.onSelIds(selIds);\n  };\n  renderColumnsMultiSelect(columns) {\n    const { data,checkedArray } = this.state;\n    const { multiSelect } = this.props;\n    let select_column = {};\n    let indeterminate_bool = false;\n    // let indeterminate_bool1 = true;\n    if (multiSelect && multiSelect.type === \"checkbox\") {\n      let i = checkedArray.length;\n      while(i--){\n          if(checkedArray[i]){\n            indeterminate_bool = true;\n            break;\n          }\n      }\n      let defaultColumns = [\n        {\n          title: (\n            <Checkbox\n              className=\"table-checkbox\"\n              checked={this.state.checkedAll}\n              indeterminate={indeterminate_bool&&!this.state.checkedAll}\n              onChange={this.onAllCheckChange}\n            />\n          ),\n          key: \"checkbox\",\n          dataIndex: \"checkbox\",\n          width: \"5%\",\n          render: (text, record, index) => {\n            return (\n              <Checkbox\n                className=\"table-checkbox\"\n                checked={this.state.checkedArray[index]}\n                onChange={this.onCheckboxChange.bind(this, text, record, index)}\n              />\n            );\n          }\n        }\n      ];\n      columns = defaultColumns.concat(columns);\n    }\n    return columns;\n  }\n  render() {\n    let columns = this.renderColumnsMultiSelect(columns12);\n    return <Table columns={columns} data={data12} />;\n  }\n}\nDemo12.defaultProps = defaultProps12;\n\n","desc":" 全选功能"},{"example":<Demo13 />,"title":" 列排序、全选功能","code":"/**\n*\n* @title 列排序、全选功能\n* @description 列排序、全选功能\n*\n*/\n\nimport React, { Component } from \"react\";\nimport Table from \"../../src\";\nimport Checkbox from \"bee-checkbox\";\nimport multiSelect from \"../../src/lib/multiSelect.js\";\nimport sort from \"../../src/lib/sort.js\";\n\nconst columns13 = [\n  {\n    title: \"名字\",\n    dataIndex: \"a\",\n    key: \"a\",\n    width: 100\n  },\n  {\n    title: \"性别\",\n    dataIndex: \"b\",\n    key: \"b\",\n    width: 100\n  },\n  {\n    title: \"年龄\",\n    dataIndex: \"c\",\n    key: \"c\",\n    width: 200,\n    sorter: (a, b) => a.c - b.c\n  },\n  {\n    title: \"操作\",\n    dataIndex: \"\",\n    key: \"d\",\n    render() {\n      return <a href=\"#\">一些操作</a>;\n    }\n  }\n];\n\nconst data13 = [\n  { a: \"杨过\", b: \"男\", c: 30, key: \"2\" },\n  { a: \"令狐冲\", b: \"男\", c: 41, key: \"1\" },\n  { a: \"郭靖\", b: \"男\", c: 25, key: \"3\" }\n];\nclass Demo13 extends Component {\n  getSelectedDataFunc = (data) =>{\n    console.log(data)\n  }\n  render() {\n    let multiObj = {\n      type: \"checkbox\",\n      param: \"key\"\n    };\n    let ComplexTable = multiSelect(sort(Table));\n    return (\n      <div>\n        <ComplexTable\n          columns={columns13}\n          data={data13}\n          multiSelect={multiObj}\n          getSelectedDataFunc={this.getSelectedDataFunc}\n        />\n      </div>\n    );\n  }\n}\n\n","desc":" 列排序、全选功能"},{"example":<Demo14 />,"title":" 合计表格","code":"/**\n*\n* @title 合计表格\n* @description\n*\n*/\n\nimport React, { Component } from \"react\";\nimport Table from \"../../src\";\n\nconst columns14 = [\n  { title: \"用户名\", dataIndex: \"a\", key: \"a\", width: 100 },\n  { id: \"123\", title: \"性别\", dataIndex: \"b\", key: \"b\", width: 100 },\n  {\n    title: \"年龄\",\n    dataIndex: \"c\",\n    key: \"c\",\n    width: 200,\n    heji: true,\n    render(data) {\n      return <a href=\"#\">一些操作</a>;\n    }\n  },\n  {\n    title: \"操作\",\n    dataIndex: \"d\",\n    key: \"d\",\n    render(data) {\n      return <a href=\"#\">一些操作</a>;\n    }\n  }\n];\nconst columns14_ = [\n  { title: \"用户名\", dataIndex: \"a\", key: \"a\", width: 100 },\n  { id: \"123\", title: \"性别\", dataIndex: \"b\", key: \"b\", width: 100 },\n  {\n    title: \"年龄\",\n    dataIndex: \"c\",\n    key: \"c\",\n    width: 200,\n    heji: true\n  },\n  {\n    title: \"操作\",\n    dataIndex: \"d\",\n    key: \"d\"\n  }\n];\n\nconst data14 = [\n  { a: \"令狐冲\", b: \"男\", c: 41, key: \"1\" },\n  { a: \"杨过\", b: \"男\", c: 67, key: \"2\" },\n  { a: \"郭靖\", b: \"男\", c: 25, key: \"3\" },\n  { a: \"合计\", d: \"11\", key: \"31\" }\n];\n\nconst data14_ = [\n  { a: \"郭靖\", b: \"男\", c: 25,d:11, key: \"3\" }\n];\n\nclass Demo14 extends Component {\n  render() {\n    return (\n      <Table\n        columns={columns14}\n        data={data14}\n        heji={true}\n        title={currentData => <div>标题: 这是一个标题</div>}\n        footer={currentData => (\n          <Table\n            showHeader={false}\n            columns={columns14_}\n            data={data14_}\n            heji={true}\n          />\n        )}\n      />\n    );\n  }\n}\n\n\n","desc":""},{"example":<Demo15 />,"title":" edittype表格","code":"/**\n*\n* @title edittype表格\n* @description 这是带有增删改功能的表格\n*\n*/\n\nimport Button from \"bee-button\";\nimport React, { Component } from \"react\";\nimport Table from \"../../src\";\nimport Animate from \"bee-animate\";\nimport Icon from \"bee-icon\";\nimport Input from \"bee-form-control\";\nimport Checkbox from \"bee-checkbox\";\nimport Select from 'bee-select';\nimport Popconfirm from \"bee-popconfirm\";\nimport InputRender from \"../../src/render/InputRender.js\";\n\nclass Demo15 extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      dataSource: [\n        {\n          key: \"0\",\n          name: \"沉鱼\",\n          age: \"y\",\n          address: \"96, 77, 89\"\n        },\n        {\n          key: \"1\",\n          name: \"落雁\",\n          age: \"y\",\n          address: \"90, 70, 80\"\n        },\n        {\n          key: \"2\",\n          name: \"闭月\",\n          age: \"n\",\n          address: \"80, 60, 80\"\n        },\n        {\n          key: \"3\",\n          name: \"羞花\",\n          age: \"y\",\n          address: \"120, 60, 90\"\n        }\n      ],\n      count: 4\n    };\n    this.columns = [\n      {\n        title: \"姓名\",\n        dataIndex: \"name\",\n        key: \"name\",\n        width: \"30%\",\n        render: (text, record, index) => (\n          <InputRender\n            value={text}\n            isclickTrigger={true}\n            onChange={this.onCellChange(index, \"name\")}\n          />\n        )\n      },\n      {\n        title: \"年龄\",\n        dataIndex: \"age\",\n        key: \"age\",\n        render: (text, record, index) => (\n          <Checkbox\n            checked={record.age}\n            onChange={this.onCheckChange(index, \"age\")}\n          />\n        )\n      },\n      {\n        title: \"你懂的\",\n        dataIndex: \"address\",\n        key: \"address\",\n        render: (text, record, index) => {\n          return (\n            <Select\n              defaultValue=\"lucy\"\n              style={{ width: 200, marginRight: 6 }}\n              onChange={this.handleChange}\n            >\n              <Option value=\"jack\">boyuzhou</Option>\n              <Option value=\"lucy\">renhualiu</Option>\n              <Option value=\"disabled\" disabled>\n                Disabled\n              </Option>\n              <Option value=\"yiminghe\">yuzhao</Option>\n            </Select>\n          );\n        }\n      },\n      {\n        title: \"操作\",\n        dataIndex: \"operation\",\n        key: \"operation\",\n        render: (text, record, index) => {\n          return this.state.dataSource.length > 1 ? (\n            <Popconfirm content=\"确认删除?\" id=\"aa\" onClose={this.onDelete(index)}>\n              <Icon type=\"uf-del\" />\n            </Popconfirm>\n          ) : null;\n        }\n      }\n    ];\n  }\n  handleChange = value => {\n    console.log(`selected ${value}`);\n  };\n  onCheckChange = (index, key) => {\n    return value => {\n      const dataSource = [...this.state.dataSource];\n      dataSource[index][key] = value;\n      this.setState({ dataSource });\n    };\n  };\n  onCellChange = (index, key) => {\n    return value => {\n      const dataSource = [...this.state.dataSource];\n      dataSource[index][key] = value;\n      this.setState({ dataSource });\n    };\n  };\n  onDelete = index => {\n    return () => {\n      const dataSource = [...this.state.dataSource];\n      dataSource.splice(index, 1);\n      this.setState({ dataSource });\n    };\n  };\n  handleAdd = () => {\n    const { count, dataSource } = this.state;\n    const newData = {\n      key: count,\n      name: `凤姐 ${count}`,\n      age: 32,\n      address: `100 100 100`\n    };\n    this.setState({\n      dataSource: [...dataSource, newData],\n      count: count + 1\n    });\n  };\n\n  getBodyWrapper = body => {\n    return (\n      <Animate\n        transitionName=\"move\"\n        component=\"tbody\"\n        className={body.props.className}\n      >\n        {body.props.children}\n      </Animate>\n    );\n  };\n  render() {\n    const { dataSource } = this.state;\n    const columns = this.columns;\n    return (\n      <div>\n        <Button\n          className=\"editable-add-btn\"\n          type=\"ghost\"\n          onClick={this.handleAdd}\n        >\n          添加\n        </Button>\n        <Table\n          bordered\n          data={dataSource}\n          columns={columns}\n          getBodyWrapper={this.getBodyWrapper}\n        />\n      </div>\n    );\n  }\n}\n\n\n","desc":" 这是带有增删改功能的表格"},{"example":<Demo2 />,"title":" 增删改表格","code":"/**\n*\n* @title 增删改表格\n* @description 这是带有增删改功能的表格\n*\n*/\n\nimport Button from \"bee-button\";\nimport React, { Component } from \"react\";\nimport Table from \"../../src\";\nimport Animate from \"bee-animate\";\nimport Icon from \"bee-icon\";\nimport Input from \"bee-form-control\";\nimport Popconfirm from \"bee-popconfirm\";\n\nclass EditableCell extends React.Component {\n  state = {\n    value: this.props.value,\n    editable: false\n  };\n  handleChange = e => {\n    const value = e.target.value;\n    this.setState({ value });\n  };\n  check = () => {\n    this.setState({ editable: false });\n    if (this.props.onChange) {\n      this.props.onChange(this.state.value);\n    }\n  };\n  edit = () => {\n    this.setState({ editable: true });\n  };\n  handleKeydown = event => {\n    console.log(event.keyCode);\n    if (event.keyCode == 13) {\n      this.check();\n    }\n  };\n  render() {\n    const { value, editable } = this.state;\n    return (\n      <div className=\"editable-cell\">\n        {editable ? (\n          <div className=\"editable-cell-input-wrapper\">\n            <Input\n              value={value}\n              onChange={this.handleChange}\n              onKeyDown={this.handleKeydown}\n            />\n            <Icon\n              type=\"uf-correct\"\n              className=\"editable-cell-icon-check\"\n              onClick={this.check}\n            />\n          </div>\n        ) : (\n          <div className=\"editable-cell-text-wrapper\">\n            {value || \" \"}\n            <Icon\n              type=\"uf-pencil\"\n              className=\"editable-cell-icon\"\n              onClick={this.edit}\n            />\n          </div>\n        )}\n      </div>\n    );\n  }\n}\n\nclass Demo2 extends React.Component {\n  constructor(props) {\n    super(props);\n    this.columns = [\n      {\n        title: \"姓名\",\n        dataIndex: \"name\",\n        key: \"name\",\n        width: \"30%\",\n        render: (text, record, index) => (\n          <EditableCell\n            value={text}\n            onChange={this.onCellChange(index, \"name\")}\n          />\n        )\n      },\n      {\n        title: \"年龄\",\n        dataIndex: \"age\",\n        key: \"age\"\n      },\n      {\n        title: \"你懂的\",\n        dataIndex: \"address\",\n        key: \"address\"\n      },\n      {\n        title: \"操作\",\n        dataIndex: \"operation\",\n        key: \"operation\",\n        render: (text, record, index) => {\n          return this.state.dataSource.length > 1 ? (\n            <Popconfirm content=\"确认删除?\" id=\"aa\" onClose={this.onDelete(index)}>\n              <Icon type=\"uf-del\" />\n            </Popconfirm>\n          ) : null;\n        }\n      }\n    ];\n\n    this.state = {\n      dataSource: [\n        {\n          key: \"0\",\n          name: \"沉鱼\",\n          age: \"18\",\n          address: \"96, 77, 89\"\n        },\n        {\n          key: \"1\",\n          name: \"落雁\",\n          age: \"16\",\n          address: \"90, 70, 80\"\n        },\n        {\n          key: \"2\",\n          name: \"闭月\",\n          age: \"17\",\n          address: \"80, 60, 80\"\n        },\n        {\n          key: \"3\",\n          name: \"羞花\",\n          age: \"20\",\n          address: \"120, 60, 90\"\n        }\n      ],\n      count: 4\n    };\n  }\n  onCellChange = (index, key) => {\n    return value => {\n      const dataSource = [...this.state.dataSource];\n      dataSource[index][key] = value;\n      this.setState({ dataSource });\n    };\n  };\n  onDelete = index => {\n    return () => {\n      const dataSource = [...this.state.dataSource];\n      dataSource.splice(index, 1);\n      this.setState({ dataSource });\n    };\n  };\n  handleAdd = () => {\n    const { count, dataSource } = this.state;\n    const newData = {\n      key: count,\n      name: `凤姐 ${count}`,\n      age: 32,\n      address: `100 100 100`\n    };\n    this.setState({\n      dataSource: [...dataSource, newData],\n      count: count + 1\n    });\n  };\n\n  getBodyWrapper = body => {\n    return (\n      <Animate\n        transitionName=\"move\"\n        component=\"tbody\"\n        className={body.props.className}\n      >\n        {body.props.children}\n      </Animate>\n    );\n  };\n  render() {\n    const { dataSource } = this.state;\n    const columns = this.columns;\n    return (\n      <div>\n        <Button\n          className=\"editable-add-btn\"\n          type=\"ghost\"\n          onClick={this.handleAdd}\n        >\n          添加\n        </Button>\n        <Table\n          bordered\n          data={dataSource}\n          columns={columns}\n          getBodyWrapper={this.getBodyWrapper}\n        />\n      </div>\n    );\n  }\n}\n\n\n","desc":" 这是带有增删改功能的表格"},{"example":<Demo3 />,"title":" 更灵活的表格","code":"/**\n*\n* @title 更灵活的表格\n* @description 手写表格的头组件来达到更灵活的配置表格\n*\n*/\n\n\nimport Button from 'bee-button';\nimport React, { Component } from 'react';\nimport Table from 'bee-table';\n\nconst { ColumnGroup, Column } = Table;\n\nconst data3 = [\n  { a: '北京', b: '北京', c: '250', d: 2, key: '1' },\n];\n\nclass Demo3 extends Component {\n    render () {\n        return (\n\n  <Table data={data3}>\n    <ColumnGroup title=\"地址\">\n      <Column\n        title=\"省\"\n        dataIndex=\"a\"\n        key=\"a\"\n        width={100}\n      />\n      <Column\n        id=\"123\"\n        title=\"市\"\n        dataIndex=\"b\"\n        key=\"b\"\n        width={100}\n      />\n    </ColumnGroup>\n    <Column\n      title=\"数量\"\n      dataIndex=\"c\"\n      key=\"c\"\n      width={200}\n    />\n    <Column\n      title=\"操作\"\n      dataIndex=\"\"\n      key=\"d\"\n      render={(text, record, index) => {\n        return (\n            <Button size=\"sm\" colors=\"info\" style={{ minWidth: 50 }}>增加</Button>\n        );\n      }}\n    />\n  </Table>\n        )\n    }\n}\n\n","desc":" 手写表格的头组件来达到更灵活的配置表格"},{"example":<Demo4 />,"title":" 树形数据展示","code":"/**\n*\n* @title 树形数据展示\n* @description 手写表格的头组件来达到更灵活的配置表格\n*\n*/\n\n\nimport React, { Component } from 'react';\nimport Table from 'bee-table';\n\n\nconst columns4 = [\n  {\n    title: \"Name\",\n    dataIndex: \"name\",\n    key: \"name\",\n    width: \"40%\"\n  },\n  {\n    title: \"Age\",\n    dataIndex: \"age\",\n    key: \"age\",\n    width: \"30%\"\n  },\n  {\n    title: \"Address\",\n    dataIndex: \"address\",\n    key: \"address\"\n  }\n];\n\nconst data4 = [\n  {\n    key: 1,\n    name: \"John Brown sr.\",\n    age: 60,\n    address: \"New York No. 1 Lake Park\",\n    children: [\n      {\n        key: 11,\n        name: \"John Brown\",\n        age: 42,\n        address: \"New York No. 2 Lake Park\"\n      },\n      {\n        key: 12,\n        name: \"John Brown jr.\",\n        age: 30,\n        address: \"New York No. 3 Lake Park\",\n        children: [\n          {\n            key: 121,\n            name: \"Jimmy Brown\",\n            age: 16,\n            address: \"New York No. 3 Lake Park\"\n          }\n        ]\n      },\n      {\n        key: 13,\n        name: \"Jim Green sr.\",\n        age: 72,\n        address: \"London No. 1 Lake Park\",\n        children: [\n          {\n            key: 131,\n            name: \"Jim Green\",\n            age: 42,\n            address: \"London No. 2 Lake Park\",\n            children: [\n              {\n                key: 1311,\n                name: \"Jim Green jr.\",\n                age: 25,\n                address: \"London No. 3 Lake Park\"\n              },\n              {\n                key: 1312,\n                name: \"Jimmy Green sr.\",\n                age: 18,\n                address: \"London No. 4 Lake Park\"\n              }\n            ]\n          }\n        ]\n      }\n    ]\n  },\n  {\n    key: 2,\n    name: \"Joe Black\",\n    age: 32,\n    address: \"Sidney No. 1 Lake Park\"\n  }\n];\nclass Demo4 extends Component {\n  render() {\n    return <Table columns={columns4} data={data4} />;\n  }\n}\n\n\n","desc":" 手写表格的头组件来达到更灵活的配置表格"},{"example":<Demo5 />,"title":" 固定列","code":"/**\n*\n* @title 固定列\n* @description 固定列到表格的某侧\n*\n*/\n\n\n\nimport React, { Component } from 'react';\nimport Table from 'bee-table';\n\n\n\nconst columns5 = [\n  {\n    title: \"Full Name\",\n    width: 100,\n    dataIndex: \"name\",\n    key: \"name\",\n    fixed: \"left\"\n  },\n  { title: \"Age\", width: 100, dataIndex: \"age\", key: \"age\", fixed: \"left\" },\n  { title: \"Column 1\", dataIndex: \"address\", key: \"1\" },\n  { title: \"Column 2\", dataIndex: \"address\", key: \"2\" },\n  { title: \"Column 3\", dataIndex: \"address\", key: \"3\" },\n  { title: \"Column 4\", dataIndex: \"address\", key: \"4\" },\n  { title: \"Column 5\", dataIndex: \"address\", key: \"5\" },\n  { title: \"Column 6\", dataIndex: \"address\", key: \"6\" },\n  { title: \"Column 7\", dataIndex: \"address\", key: \"7\" },\n  { title: \"Column 8\", dataIndex: \"address\", key: \"8\" }\n];\n\nconst data5 = [\n  {\n    key: \"1\",\n    name: \"John Brown\",\n    age: 32,\n    address: \"New York Park\"\n  },\n  {\n    key: \"2\",\n    name: \"Jim Green\",\n    age: 40,\n    address: \"London Park\"\n  },\n  {\n    key: \"3\",\n    name: \"Jim Green\",\n    age: 40,\n    address: \"London Park\"\n  },\n  {\n    key: \"4\",\n    name: \"Jim Green\",\n    age: 40,\n    address: \"London Park\"\n  }\n];\n\nclass Demo5 extends Component {\n  render() {\n    return <Table columns={columns5} data={data5} scroll={{ x: 1500 }} />;\n  }\n}\n\n","desc":" 固定列到表格的某侧"},{"example":<Demo6 />,"title":" 固定表头","code":"/**\n*\n* @title 固定表头\n* @description 方便一页内展示大量数据。需要指定 column 的 width 属性，否则列头和内容可能不对齐。\n*\n*/\n\n\nimport React, { Component } from 'react';\nimport Table from 'bee-table';\n\n\nconst columns6 = [\n  {\n    title: \"Full Name\",\n    width: 100,\n    dataIndex: \"name\",\n    key: \"name\"\n  },\n  { title: \"Age\", width: 100, dataIndex: \"age\", key: \"age\"},\n  { title: \"Column 1\", dataIndex: \"address\", key: \"1\" },\n  { title: \"Column 2\", dataIndex: \"address\", key: \"2\" },\n  { title: \"Column 3\", dataIndex: \"address\", key: \"3\" },\n  { title: \"Column 4\", dataIndex: \"address\", key: \"4\" },\n  { title: \"Column 5\", dataIndex: \"address\", key: \"5\" },\n  { title: \"Column 6\", dataIndex: \"address\", key: \"6\" },\n  { title: \"Column 7\", dataIndex: \"address\", key: \"7\" },\n  { title: \"Column 8\", dataIndex: \"address\", key: \"8\" }\n];\n\nconst data6 = [\n  {\n    key: \"1\",\n    name: \"John Brown\",\n    age: 32,\n    address: \"New York Park\"\n  },\n  {\n    key: \"2\",\n    name: \"Jim Green\",\n    age: 40,\n    address: \"London Park\"\n  },\n  {\n    key: \"3\",\n    name: \"Jim Green\",\n    age: 40,\n    address: \"London Park\"\n  },\n  {\n    key: \"4\",\n    name: \"Jim Green\",\n    age: 40,\n    address: \"London Park\"\n  },{\n    key: \"11\",\n    name: \"John Brown\",\n    age: 32,\n    address: \"New York Park\"\n  },\n  {\n    key: \"12\",\n    name: \"Jim Green\",\n    age: 40,\n    address: \"London Park\"\n  },\n  {\n    key: \"13\",\n    name: \"Jim Green\",\n    age: 40,\n    address: \"London Park\"\n  },\n  {\n    key: \"14\",\n    name: \"Jim Green\",\n    age: 40,\n    address: \"London Park\"\n  }\n];\n\nclass Demo6 extends Component {\n  render() {\n    return <Table columns={columns6} data={data6} scroll={{ y: 150 }} />;\n  }\n}\n\n","desc":" 方便一页内展示大量数据。需要指定 column 的 width 属性，否则列头和内容可能不对齐。"},{"example":<Demo7 />,"title":" 主子表","code":"/**\n*\n* @title 主子表\n* @description 主表点击子表联动\n*\n*/\n\n\nimport React, { Component } from 'react';\nimport Table from 'bee-table';\n\n\n\nconst columns7 = [\n  { title: \"用户名\", dataIndex: \"a\", key: \"a\"},\n  { id: \"123\", title: \"性别\", dataIndex: \"b\", key: \"b\"},\n  { title: \"年龄\", dataIndex: \"c\", key: \"c\"},\n  {\n    title: \"操作\",\n    dataIndex: \"\",\n    key: \"d\",\n    render() {\n      return <a href=\"#\">一些操作</a>;\n    }\n  }\n];\n\nconst data7 = [\n  { a: \"令狐冲\", b: \"男\", c: 41, key: \"1\" },\n  { a: \"杨过\", b: \"男\", c: 67, key: \"2\" },\n  { a: \"郭靖\", b: \"男\", c: 25, key: \"3\" }\n];\n\nconst columns7_1 = [\n  { title: \"用户名\", dataIndex: \"a\", key: \"a\"},\n  { id: \"123\", title: \"班级\", dataIndex: \"b\", key: \"b\"},\n  { title: \"系别\", dataIndex: \"c\", key: \"c\"}\n];\n\nclass Demo7 extends Component {\n  constructor(props){\n    super(props);\n    this.state = {\n      children_data : []\n    }\n  }\n  rowclick = (record, index) => {\n    console.log(record)\n    console.log(index)\n    if(record.a === '令狐冲'){\n      this.setState({\n        children_data: [\n          { a: \"令狐冲\", b: \"01班\", c: '文学系', key: \"1\" },\n        ]\n      })\n    }else if(record.a === '杨过'){\n      this.setState({\n        children_data: [\n          { a: \"杨过\", b: \"01班\", c: '外语系', key: \"2\" },\n        ]\n      })\n    }else if(record.a === '郭靖'){\n      this.setState({\n        children_data: [\n          { a: \"郭靖\", b: \"02班\", c: '美术系', key: \"3\" }\n        ]\n      })\n    }\n  }\n  render() {\n    return (\n      <div>\n        <Table\n          columns={columns7_1}\n          data={data7}\n          onRowClick={this.rowclick}\n          title={currentData => <div>标题: 我是主表</div>}\n        />\n        <Table\n          columns={columns7}\n          data={this.state.children_data}\n          title={currentData => <div>标题: 我是子表</div>}\n        />\n      </div>\n    );\n  }\n}\n\n","desc":" 主表点击子表联动"},{"example":<Demo8 />,"title":" 表格+分页","code":"/**\n*\n* @title 表格+分页\n* @description 点击分页联动表格\n*\n*/\n\n\nimport React, { Component } from 'react';\nimport Table from 'bee-table';\nimport Pagination from \"bee-pagination\";\n\n\nconst columns8 = [\n  { title: \"用户名\", dataIndex: \"a\", key: \"a\", width: 100 },\n  { id: \"123\", title: \"性别\", dataIndex: \"b\", key: \"b\", width: 100 },\n  { title: \"年龄\", dataIndex: \"c\", key: \"c\", width: 200 },\n  {\n    title: \"操作\",\n    dataIndex: \"\",\n    key: \"d\",\n    render() {\n      return <a href=\"#\">一些操作</a>;\n    }\n  }\n];\n\nclass Demo8 extends Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      data8: [\n        { a: \"令狐冲\", b: \"男\", c: 41, key: \"1\" },\n        { a: \"杨过\", b: \"男\", c: 67, key: \"2\" },\n        { a: \"郭靖\", b: \"男\", c: 25, key: \"3\" }\n      ],\n      activePage: 1\n    };\n  }\n  handleSelect(eventKey) {\n    if(eventKey === 1){\n      this.setState({\n        data8: [\n          { a: \"令狐冲\", b: \"男\", c: 41, key: \"1\" },\n          { a: \"杨过\", b: \"男\", c: 67, key: \"2\" },\n          { a: \"郭靖\", b: \"男\", c: 25, key: \"3\" }\n        ],\n        activePage: eventKey\n      });\n    }else{\n      this.setState({\n        data8: [\n          { a: \"芙蓉姐姐\", b: \"女\", c: 23, key: \"1\" }\n        ],\n        activePage: eventKey\n      });\n    }\n    \n  }\n  render() {\n    return (\n      <div>\n        <Table columns={columns8} data={this.state.data8} />\n       <Pagination\n\t        \tfirst\n\t        \tlast\n\t        \tprev\n\t        \tnext\n\t        \tboundaryLinks\n\t\t        items={2}\n\t\t        maxButtons={5}\n\t\t        activePage={this.state.activePage}\n\t\t        onSelect={this.handleSelect.bind(this)} />\n      </div>\n    );\n  }\n}\n","desc":" 点击分页联动表格"},{"example":<Demo9 />,"title":" 表格+搜索","code":"/**\n*\n* @title 表格+搜索\n* @description 搜索刷新表格数据\n*\n*/\n\n\n\nimport React, { Component } from 'react';\nimport Table from 'bee-table';\nimport Icon from \"bee-icon\";\nimport InputGroup from 'bee-input-group';\nimport FormControl from 'bee-form-control';\n\n\nclass Search extends Component {\n  state = {\n    searchValue: \"\",\n    empty: false\n  };\n\n  /**\n   * 搜索\n   */\n  handleSearch = () => {\n    let { onSearch,handleToChange } = this.props;\n    handleToChange && handleToChange();\n    onSearch && onSearch(this.state.searchValue);\n  };\n\n  /**\n   * 捕获回车\n   * @param e\n   */\n  handleKeyDown = e => {\n    if (e.keyCode === 13) {\n      this.handleSearch();\n    }\n  };\n\n  /**\n   * 输入框改变\n   * @param e\n   */\n  handleChange = e => {\n    this.setState({\n      searchValue: e.target.value\n    });\n  };\n\n  /**\n   * 清空输入框\n   */\n  emptySearch = () => {\n    let { onEmpty } = this.props;\n    this.setState({\n      searchValue: \"\",\n      empty: false\n    });\n    onEmpty && onEmpty();\n  };\n\n  render() {\n    return (\n      <InputGroup simple className=\"search-component\">\n        <FormControl\n          onChange={this.handleChange}\n          value={this.state.searchValue}\n          onKeyDown={this.handleKeyDown}\n          type=\"text\"\n        />\n        {this.state.empty\n          ? <Icon\n              type=\"uf-close-c\"\n              onClick={this.emptySearch}\n              className=\"empty-search\"\n            />\n          : null}\n\n        <InputGroup.Button onClick={this.handleSearch} shape=\"border\">\n          <Icon type=\"uf-search\" />\n        </InputGroup.Button>\n      </InputGroup>\n    );\n  }\n}\n\nconst columns9 = [\n  { title: \"用户名\", dataIndex: \"a\", key: \"a\", width: 100 },\n  { id: \"123\", title: \"性别\", dataIndex: \"b\", key: \"b\", width: 100 },\n  { title: \"年龄\", dataIndex: \"c\", key: \"c\", width: 200 },\n  {\n    title: \"操作\",\n    dataIndex: \"\",\n    key: \"d\",\n    render() {\n      return <a href=\"#\">一些操作</a>;\n    }\n  }\n];\n\nclass Demo9 extends Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      data: [\n        { a: \"令狐冲\", b: \"男\", c: 41, key: \"1\" },\n        { a: \"杨过\", b: \"男\", c: 67, key: \"2\" },\n        { a: \"郭靖\", b: \"男\", c: 25, key: \"3\" }\n      ]\n    };\n  }\n  handleSearchToTable=()=>{\n    this.setState({\n      data: [\n        { a: \"令狐冲\", b: \"男\", c: 41, key: \"1\" }\n      ]\n    })\n  }\n  render() {\n    return (\n      <div>\n        <div className=\"clearfix\">\n          <Search handleToChange={this.handleSearchToTable}/>\n        </div>\n        <Table columns={columns9} data={this.state.data} />\n      </div>\n    );\n  }\n}\n\n","desc":" 搜索刷新表格数据"}]


class Demo extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({ open: !this.state.open })
    }

    render () {
        const { title, example, code, desc  } = this.props;
        let caret = this.state.open ? CARETUP : CARET;
        let text = this.state.open ? "隐藏代码" : "查看代码";

        const footer = (
            <Button shape="block" onClick={ this.handleClick }>
                { caret }
                { text }
            </Button>
        );
        const header = (
            <Row>
                <Col md={12}>
                { example }
                </Col>
            </Row>
        );
        return (
            <Col md={12} >
                <h3>{ title }</h3>
                <p>{ desc }</p>
                <Panel collapsible headerContent expanded={ this.state.open } colors='bordered' header={ header } footer={footer} footerStyle = {{padding: 0}}>
                    <pre><code className="hljs javascript">{ code }</code></pre>
                </Panel>
            </Col>
        )
    }
}

class DemoGroup extends Component {
    constructor(props){
        super(props)
    }
    render () {
        return (
                <Row>
                    {DemoArray.map((child,index) => {

                        return (
                            <Demo example= {child.example} title= {child.title} code= {child.code} desc= {child.desc} key= {index}/>
                        )

                    })}
                </Row>
        )
    }
}

ReactDOM.render(<DemoGroup/>, document.getElementById('tinperBeeDemo'));
