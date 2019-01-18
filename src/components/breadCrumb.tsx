import * as React from 'react';
import {
    Link
} from 'react-router-dom';
import { Breadcrumb } from 'antd';
import routes from '../route/';

export default class BreadCrumbComponent extends React.Component<{}, {}> {
    constructor(props: any) {
        super(props);
    }
    public render() {
        return (
            <Breadcrumb style={{ padding: '5px 10px', marginBottom: 10, background: '#ececec', borderRadius: 4 }}>
                {
                    getList()
                }
            </Breadcrumb>
        );
    }
}

function getList() {
    const arr: object[] = [];
    routes.forEach((item: any, i: number) => {
        if (window.location.pathname.indexOf(item.path) >= 0) {
            arr.push(<Breadcrumb.Item key={i}><Link to={item.path} >{item.name}</Link></Breadcrumb.Item>);
        }
        if (item.route) {
            item.route.forEach((subitem: any, n: number) => {
                if (window.location.pathname.indexOf(subitem.path) >= 0) {
                    arr.push(<Breadcrumb.Item key={i}>{item.name}</Breadcrumb.Item>);
                    arr.push(
                        (
                            <Breadcrumb.Item key={`${i}-${n}`}>
                                <Link to={subitem.path} >{subitem.name}</Link>
                            </Breadcrumb.Item>
                        )
                    );
                }
            });
        }
    });
    return arr;
}
