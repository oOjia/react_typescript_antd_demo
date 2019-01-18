import * as React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
import '../css/Login.css';

class NormalLogin extends React.Component<any, any> {
    public handleSubmit = () => {
        alert(this.props.location.state);
    }
    public render() {
        return (
            <div className="login-box">
                <div>
                    <h2 className="login-title">用户名密码随便输入</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入用户名" />
                        </FormItem>
                        <FormItem>
                            <Input
                                prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                                type="password"
                                placeholder="请输入密码"
                            />
                        </FormItem>
                        <FormItem>
                            <Checkbox>记住密码</Checkbox>
                            <a className="login-form-forgot" href="">忘记密码</a>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            <a href="">注册</a>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}
export default NormalLogin;