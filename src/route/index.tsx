import * as React from 'react';
import { Rate } from 'antd';
import BannerManager from '../view/bannerManager';
import recommendEstate from '../view/recommendEstate';
import Home from '../view/home';

export class About extends React.Component<{}, null> {
    public render() {
        return <div><div>评分</div><Rate allowHalf={true} defaultValue={2.5} /></div>;
    }
}

// 路由命名唯一
const routes = [
    {
        name: '首页',
        path: '/',
        exact: true,
        component: Home,
        icon: 'home'
    },
    {
        name: '前台网站设置',
        icon: 'flag',
        route: [
            {
                path: '/recommendEstate',
                component: recommendEstate,
                name: '推荐管理',
                icon: 'exception'
            },
            {
                path: '/bannerManager',
                component: BannerManager,
                name: '广告运营管理',
                icon: 'shop'
            }
        ],
    },
    {
        name: '其他',
        route: [
            {
                path: '/about',
                component: About,
                name: '关于',
                icon: 'about'
            }
        ],
    },
];
export default routes;