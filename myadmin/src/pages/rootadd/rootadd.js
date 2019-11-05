import React from 'react'
import {Card,message} from 'antd'
class RootAdd extends React.Component{
    constructor(){
        super()
        this.state={
            userName:'',
            passWord:''
        }
    }
    submit=()=>{
        let {userName,passWord}=this.state
        this.$axios.post('/hehe/v1/admin/root/add',{userName,passWord}).then((data)=>{
            if(data.err===0){
                message.success('添加成功')
            }
        })
    }
    render(){
        let {userName,passWord}=this.state
        return(
            <div>
                <Card title='管理员添加'>
                    <label >管理员账号：</label>
                    <input type="text" value={userName} onChange={(e)=>{
                        this.setState({userName:e.target.value})
                    }}/> 
                    <br/> 
                    <label >管理员密码：</label>
                    <input type="text" value={passWord} onChange={(e)=>{
                        this.setState({passWord:e.target.value})
                    }}/> 
                    <br/> 
                    <button onClick={this.submit}>添加</button>
                </Card>
            </div>
        )
    }
}
export default RootAdd
