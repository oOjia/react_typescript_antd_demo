import * as React from 'react';
import '../css/App.css';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import allRoutes from '../route/all';
import HeaderComponent from '../components/header';
import MenuComponent from '../components/menu';
import BreadCrumbComponent from '../components/breadCrumb';
// import { userAction } from '../store/actions';
// import { connect } from 'react-redux';
import { Layout } from 'antd';
const { Content, Sider } = Layout;

interface IMode {
  mode: string;
  collapsed: boolean;
}
class Main extends React.Component<any, IMode> {
  constructor(props: any) {
    super(props);
    this.state = {
      mode: 'inline',
      collapsed: false
    };
    // 把store中的用户信息更新为user1的状态
    // this.props.dispatch(userAction('GET_USER1'));
    // 窗口响应事件
    window.addEventListener('resize', this.onResize);
  }
  public toggle = () => {
    const coll = !this.state.collapsed;
    this.setState({
      collapsed: coll,
      mode: coll ? 'vertical' : 'inline',
    });
  }
  public onResize = () => {
    isDesktop() ? this.setState({
      collapsed: false,
      mode: 'inline',
    }) : this.setState({
      collapsed: true,
      mode: 'vertical',
    });
  }
  public render() {
    return (
      <Layout className="layout">
        <Sider
          trigger={null}
          collapsible={true}
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <MenuComponent mode={this.state.mode} />
        </Sider>
        <Layout className="bg-white">
          <HeaderComponent toggle={this.toggle} collapsed={this.state.collapsed} />
          <Content style={{ background: '#fff', padding: 24, margin: 0 }}>
            <BreadCrumbComponent />
            <Switch>
              {
                allRoutes.map((item: object, i: number) =>
                  <Route key={i} {...item} />
                )
              }
              <Redirect from="*" to="/" />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

function isDesktop() {
  return window.innerWidth > 993;
}

export default Main;
