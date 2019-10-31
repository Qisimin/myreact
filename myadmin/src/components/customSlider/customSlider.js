import React from 'react'
import {withRouter} from 'react-router-dom'
import { Menu, Icon } from 'antd';
const { SubMenu } = Menu;
const root=[//模拟数据
    {
        name:'首页',
        path:'/admin/home',
        key:'/admin/home'
    },
    {
        name:'用户管理',
        path:'/admin/user',
        key:'/admin/user',
        children:[
            {name:'权限管理',path:'/admin/user/root',key:'/admin/user/root'},
            {
                name:'信息管理',
                path:'/admin/user/info',
                key:'/admin/user/info',
                children:[
                    {
                        name:'信管1',
                        path:'/admin/user/info/info1',
                        key:'/admin/user/info/info1',
                    },
                    {
                        name:'信管2',
                        path:'/admin/user/info/info2',
                        key:'/admin/user/info/info2',
                        children:[
                            {
                                name:'信管21',
                                path:'/admin/user/info/info2/info21',
                                key:'/admin/user/info/info2/info21',
                            },
                            {
                                name:'信管22',
                                path:'/admin/user/info/info2/info22',
                                key:'/admin/user/info/info2/info22'                                
                            }
                        ]
                    }
                ]
            },
        ]
    },
    {
        name:'设置',
        path:'/admin/setting',
        key:'/admin/setting'
    },
]
class CustomSlider extends React.Component{
    jump=(path)=>{
        // console.log(this)
        this.props.history.push(path)
    }
    //根据穿的数据进行循环渲染
    renderItem=(data)=>{
        //1.判断有没有children   有 sub    没有 item
        return  data.map((item,index)=>{
            if(item.children){
                //渲染次级导航
                return(
                    <SubMenu key={item.key} title={item.name}>
                        {this.renderItem(item.children)}
                    </SubMenu>
                )
            }else{
                return(
                    <Menu.Item key={item.key} onClick={this.jump.bind(this,item.path)}>
                        {item.name}
                    </Menu.Item>
                )
            }       
        })
    }
    render(){
        return(
            // {/*theme='dark'主题*/}
            <Menu style={{ width: 256 }} mode="vertical" theme='dark'>
                {this.renderItem(root)}

            {/*root.map((item,index)=>{
                if(item.children){//渲染次级导航
                    return(
                        <SubMenu key={item.key} title={item.name}>
                        {item.children.map((citem,index)=>{
                            return(
                                <Menu.Item key={citem.key} onClick={this.jump.bind(this,citem.path)}>{citem.name}</Menu.Item>
                            )                            
                        })}
                        </SubMenu>
                    )
                }else{
                    return(
                        <Menu.Item key={item.key} onClick={this.jump.bind(this,item.path)}>{item.name}</Menu.Item>
                    )
                }              
            })*/}
            {/*<Menu.Item key="1">hehe</Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="mail" />
                  <span>首页</span>
                </span>
              }
            >
             
                <Menu.Item key="1">Option 1</Menu.Item>
                <Menu.Item key="2">Option 2</Menu.Item>
              
            </SubMenu>*/}
            </Menu>
        )
    }
}
export default withRouter(CustomSlider)