const express=require('express')
const app=express()
const cors=require('cors')
const fs=require('fs')// 引入node 内置文件模块
const path=require('path')
const multer  = require('multer')
const upload=multer({})//参数可传可不传
const bodyParser = require('body-parser')
//解析post数据格式
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//跨域 cors
app.use(cors())
//静态资源路径   在地址栏上输入public时，指向hehe
app.use('/public',express.static(path.join(__dirname,'./hehe')))
/*
文件上传
1.获取文件信息
2.处理文件
3，返回数据
*/ 
//single 单文件上传
app.post('/file',upload.single('hehe'),(req,res)=>{
    console.log(req.file) // 文件数据对象
    let extName=req.file.originalname.split('.')[1] //切出后缀名
    let name=(new Date).getTime()+'_'+parseInt(Math.random()*99999999)+parseInt(Math.random()*99999999)//防止上传图片名字重复，拼接一个名字，每次上传时上传不一样的图片
    // fs.writeFile  写一个文件 （路径，写的内容，回调）
    fs.writeFile(path.join(__dirname,`./hehe/${name}.${extName}`),req.file.buffer,(err)=>{
      console.log(err)
      //上传图片成功后返回路径 http://localhost:3000/1572858881988_4639506121364192.jpg
      res.send({err:0,msg:'ok',imgpath:`/${name}.${extName}`})//要把路径存在数据库里，当端口号变换时，图片路径就不能用了，所以端口号和域名不往数据库里存，只存后边的相对路径
    })
  })

app.listen(3000,()=>{
    console.log('server start')
})