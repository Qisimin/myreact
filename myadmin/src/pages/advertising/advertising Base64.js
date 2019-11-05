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
        // console.log(this)
        let img=this.refs.file.files[0]
        // console.log(img)
        let File=new FileReader()
        File.onload=()=>{
            console.log("文件读取结束")
            console.log(File.result)
            this.setState({img:File.result})
        }
        File.readAsDataURL(img)
    }
    render(){
        return(
          <Card title='上传图片'>
              <span>缩略图:</span><input type="file" ref='file'/><br/>
              <img src={this.state.img} alt=""/>
              <Button type='primay' onClick={this.submit}>提交</Button>
          </Card>
        )
    }
}
/*
1.获取本地图片
2.将本地的图片变成base64
3.通过ajax接口 将base64图片数据上传到数据库里
*/

export default FileBase64