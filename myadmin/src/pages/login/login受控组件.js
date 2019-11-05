import React from 'react'
//受控组件：表单元素的值被state进行控制，通过onChange进行修改
class Login extends React.Component{
    constructor(){
        super()
        this.state={
            us:'',
            ps:''
        }
    }
    submit=()=>{
        console.log(this.state)
    }
    render(){
        return(
            <div>
                <input type="text" placeholder='userName' value={this.state.us}
                    onChange={(e)=>{
                        this.setState({us:e.target.value})
                    }}
                />
                <br/>
                <input type="text" placeholder='passWord' value={this.state.ps}
                    onChange={(e)=>{
                        this.setState({ps:e.target.value})
                    }}
                />
                <button onClick={this.submit}>登录</button>
            </div>
        )
    }
}
export default Login