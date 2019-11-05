import React from 'react'
//antd 的form组件                           message全局弹框
import { Form, Icon, Input, Button, Checkbox,message ,Card} from 'antd';
import Style from './index.module.less'
import webstorage from '../../utils/webstorage';
class Login extends React.Component{
    submit=()=>{
        // console.log(this.state)
        // let result=this.props.form.getFieldsValue() // getFieldsValue 获取双向绑定的数据
        this.props.form.validateFields((err,userinfo)=>{
            // err验证是不是通过  通过 null 
            if(err){
                message.error('信息输入有误请重试')
            }else{
                this.$axios.post('/hehe/v1/admin/user/login',userinfo).then((data)=>{
                    // console.log(data)
                    if(data.err===0){
                        //存值
                        webstorage.setItem('rootList',data.rootList)
                        webstorage.setItem('token',data.token)
                        webstorage.setItem('uid',data.uid)
                        //跳转到首页
                        this.props.history.push('/admin/home')
                    }else{
                        message.error('信息输入有误请重试')
                    }
                })
                // message.success('登录成功,1s后跳转首页')
            }
        })
    
    }
    render(){
        // console.log(this,'login')
        const { getFieldDecorator } = this.props.form;//实现表单元素的双向数据绑定
         //  getFieldDecorator  表单组件获取数据的方法 也是一个高阶
        return(
            <div className={Style.login}>
                <Card title='用户登录' className={Style.loginCard}>  
                    <div className="login-form">
                        <Form.Item>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                            />,
                        )}
                        </Form.Item>
                        <Form.Item>
                        {getFieldDecorator('passWord', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                            />,
                        )}
                        </Form.Item>
                        <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>Remember me</Checkbox>)}
                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a>
                        <Button type="primary" onClick={this.submit} className="login-form-button">
                            Log in
                        </Button>
                        Or <a href="">register now!</a>
                        </Form.Item>
                    </div>
                </Card>
            </div>
        )
    }
}
export default Form.create()(Login)