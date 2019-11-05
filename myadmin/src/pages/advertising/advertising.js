import React,{Component} from 'react'
import {Card,Button} from 'antd'
class FileBase64 extends Component{
    constructor(){
        super()
        this.state={
          img:''
        }
    }
    submit=()=>{
        let img=this.refs.file.files[0]
        let formdata=new FormData()
        formdata.append('hehe',img)
        // console.log(formdata)//打印看不到
        // console.log(formdata.get('hehe'))
        this.$axios.post('http://localhost:3000/file',formdata)
        .then((data)=>{
        console.log(data)
        this.setState({img:data.imgpath})
        })
    }
    render(){
        return(
          <Card title='上传图片'>
              <span>缩略图:</span><input type="file" ref='file'/><br/>
              <img src={'http://localhost:3000/public'+this.state.img} alt=""/>
              <Button type='primay' onClick={this.submit}>提交</Button>
          </Card>
        )
    }
}
/*
1.直接文件上传
   a.获取图片
   b.将图片变成formdata对象
   c.将formdata对象传给后端 muter
2.将图片数据整体的上传到后端
3.由后端对数据进行处理
    将图片文件存到静态资源路径下
    将图片的相对路径存到数据库
    将路径返回给前端
*/

export default FileBase64