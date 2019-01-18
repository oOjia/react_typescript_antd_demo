import * as React from 'react';
import {
    Link
} from 'react-router-dom';
import { Menu, Icon } from 'antd';
import routes from '../route/index';
const { SubMenu } = Menu;

export default class MenuComponent extends React.Component<any, {}> {
    public render() {
        return (
            <Menu
                mode={this.props.mode}
                style={{ height: '100%', borderRight: 0 }}
                theme="dark"
            >
                {
                    routes.map((item: any, i) => {
                        if (item.route) {
                            return (
                                <SubMenu
                                    key={`${i}`}
                                    title={
                                        <span>
                                            <Icon type={item.icon} />
                                            <span className="nav-text">{`${item.name}`}</span>
                                        </span>
                                    }
                                >
                                    {
                                        item.route.map((subitem: any, n: number) =>
                                            <Menu.Item key={`${i}-${n}`}>
                                                <Link to={subitem.path}>
                                                    <Icon type={subitem.icon} />{subitem.name}
                                                </Link>
                                            </Menu.Item>
                                        )
                                    }
                                </SubMenu>
                            );
                        } else {
                            return (
                                <Menu.Item key={`${i}`}>
                                    <Link to={item.path}>
                                        <span>
                                            <Icon type={item.icon} />
                                            <span className="nav-text">{item.name}</span>
                                        </span>
                                    </Link>
                                </Menu.Item>
                            );
                        }
                    })
                }
            </Menu>
        );
    }
}