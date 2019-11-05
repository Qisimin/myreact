import React from 'react'
import Style from './index.module.less'
import Modal from '../../components/modal/modal'
import CustomSlider from '../../components/customSlider/customSlider'
import { Layout, Menu, Icon,Dropdown, Button,message} from 'antd';
import {withRouter} from 'react-router-dom'
import webStorage from '../../utils/webstorage'
const { Header, Content, Footer, Sider } = Layout;

class Admin extends React.Component{
    renderMenu=()=>{
      return(
          <Menu>
            <Menu.Item onClick={this.logout}>
              <a>用户注销</a>
            </Menu.Item>
          </Menu>
      )
    }
    logout=()=>{
      let uid=webStorage.getItem('uid');
      this.$axios.post('/hehe/v1/admin/user/logout',{uid}).then((data)=>{
        // console.log(data)
        localStorage.clear()
        this.props.history.replace('/login')
        message.success("已成功登出")
      })
    }
    render(){
        return(
        <Layout>
            <Sider
              style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
              }}
            >
             <CustomSlider></CustomSlider>
            </Sider>
            <Layout style={{ marginLeft: 200 }}>
              <Header style={{ background: '#fff', padding: 0 }}>
                <Dropdown overlay={this.renderMenu} trigger={['click']}>
                <Button className="ant-dropdown-link" href="#">
                  Click me <Icon type="down" />
                </Button>
              </Dropdown>
              </Header>
              <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
                 {this.props.children}
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
            <Modal></Modal>
          </Layout>
        )
    }
}

export default withRouter(Admin)