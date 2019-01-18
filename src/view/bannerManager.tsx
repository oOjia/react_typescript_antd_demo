import * as React from 'react';
import { Table, Button, DatePicker, Select, message } from 'antd';
const { RangePicker } = DatePicker;
const { Option } = Select;

// 引入枚举
import { publishText } from '../enum/bannerManagerEnum';

import '../css/bannerManager.css';

const columns = [{
    title: '排序',
    dataIndex: 'sort',
}, {
    title: '发布状态',
    dataIndex: 'state',
}, {
    title: '标题',
    dataIndex: 'title',
}];
const tempData: any = [];
for (let i = 0; i < 15; i++) {
    tempData.push({
        key: i,
        sort: `${i}`,
        state: i % 2 === 0 ? '未发布' : '已发布',
        title: `这里是标题`,
    });
}

class BannerManager extends React.Component<{}, {}> {
    public state = {
        data: tempData,
        selectedRowKeys: [],
        loading: false,
    };
    public start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
            message.success(`操作成功`);
        }, 1000);
    }
    public onSelectChange = (selectedRowKeys: any) => {
        this.setState({ selectedRowKeys });
    }
    public onPublish = (text: string) => {
        this.setState({ loading: true });
        const arr = this.state.selectedRowKeys;
        arr.forEach(item => {
            tempData.forEach((i: any) => {
                if (i.key === item) {
                    i.state = text;
                }
            });
        });
        this.start();
    }
    public handleAdd = () => {
        const { data } = this.state;
        const i = data.length + 1;
        const newData = {
            key: i,
            sort: `${i}`,
            state: '未发布',
            title: `新数据的标题`,
        };
        this.setState({
            data: [...data, newData],
        });
        message.success('新增成功');
    }
    public render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const onChange = (date: any, dateString: any) => {
            // console.log(date, dateString);
        };
        function handleChange(value: any) {
            // console.log(`selected ${value}`);
        }
        return (
            <div>
                <div className="btn-group">
                    <Button type="primary" onClick={this.handleAdd}>新增</Button>
                    <Button type="primary" onClick={this.onPublish.bind(this, publishText.publish)}>发布</Button>
                    <Button type="primary" onClick={this.onPublish.bind(this, publishText.unpublish)}>撤销发布</Button>
                </div>
                <div className="margin-bottom">
                    <span className="filter-title">生效日期</span>
                    <RangePicker style={{ marginRight: 10, marginBottom: 10 }} onChange={onChange} />
                    <span className="filter-title">发布状态</span>
                    <Select
                        defaultValue=""
                        style={{ width: 120, marginRight: 10, marginBottom: 10 }}
                        onChange={handleChange}
                    >
                        <Option value="">全部</Option>
                        <Option value="0">未发布</Option>
                        <Option value="1">已发布</Option>
                    </Select>
                    <span className="filter-title margin-bottom">广告位</span>
                    <Select
                        defaultValue=""
                        style={{ width: 120, marginRight: 10, marginBottom: 10 }}
                        onChange={handleChange}
                    >
                        <Option value="">全部</Option>
                        <Option value="0">顶部</Option>
                        <Option value="1">底部</Option>
                    </Select>
                    <Button type="primary" icon="search">搜索</Button>
                </div>
                <div>
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={this.state.data}
                        loading={this.state.loading}
                    />
                </div>
            </div>
        );
    }
}
export default BannerManager;