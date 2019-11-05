import React from 'react'
// import webStorage from '../../utils/webstorage'
import Style from './index.module.less'
import {Card,Table,message,Pagination,Spin, Popconfirm,Button} from 'antd'
import RootUpdate from '../rootupdata/rootupdata'

class RootList extends React.Component{
    columns=[
        {
          title: '账号',
          dataIndex: 'userName',
          key: 'name',
        },
        {
          title: '密码',
          dataIndex: 'passWord',
          key: 'age',
        },
        {
          title: '权限等级',
          dataIndex: 'rootLevel',
          key: 'address',
          render(data){
            //   console.log(data)
              let rootObj={'0':'暂无权限','1':"普通管理员",'9':"超级管理员"}
              return(
                  <span>{rootObj[data]}</span>
              )
          }
        },
        {
            title: '操作',
            key: 'action',
            render:(data)=>{
            //   console.log('删除按钮',data,this)  
               return(
                 <div> 
                 <Popconfirm 
                  title="你确定要删除吗？"
                  onConfirm={this.delRoot.bind(this,data._id)}
                  >
                 <Button size='small'>删除</Button>
                 </Popconfirm>
                 <Button size='small' onClick={this.updateRoot.bind(this,data)}>修改</Button>
                </div>
               )
            },
          },
      ];
    constructor(){
        super()
        this.state={
            dataSource:[],
            total:0,//总数据条数
            pageSize:2,//每页的条数
            page:1, //当前页
            spinning:true,
            updateShow:false
        }
    }
    cancelUpdate=(state)=>{
        if(state){
          this.getRootList(this.state.page,this.state.pageSize)
          this.setState({updateShow:false})
        }else{
          this.setState({updateShow:false})
        }
      }
    updateRoot=(data)=>{
        // console.log('修改数据',data)
        this.data=data
        // console.log('修改数据',this)
        this.setState({updateShow:true})
    }
    delRoot=(uid)=>{
        // console.log('删除'+uid)
        this.$axios.post('/hehe/v1/admin/root/del',{uid}).then((data)=>{
            if(data.err===0){
                message.success('删除成功')
                //删除成功之后，请求最新数据，刷新界面
                this.getRootList(this.state.page,this.state.pageSize)
            }
        })
    }
    componentDidMount(){
        this.getRootList(1,this.state.pageSize)
    }
    getRootList(page,pageSize){
        this.setState({spinning:true})
        this.$axios.post('/hehe/v1/admin/root/list',{page:page,pageSize:pageSize}).then((data)=>{
            // console.log(data)
            if(data.err===0){
                // let tmppage=page
                // 边界判断
                // console.log(data.total)
                // console.log(this.state.pageSize)
                // console.log(Math.ceil(data.total/this.state.pageSize))
                // if(Math.ceil(data.total/this.state.pageSize)<page){
                //     tmppage=Math.ceil(data.total/this.state.pageSize)
                // }
                this.setState({dataSource:data.list,total:data.total,spinning:false,page:page})
            }
        })
    }
    //分页的页码发生改变
    pageChange=(page,pageSize)=>{
        // console.log('页码改变',page,pageSize)
        //当页码发生改变，重新请求数据（总条数，每页条数，数据显示）
            this.getRootList(page,pageSize)
    }
    render(){
        let {dataSource,total,pageSize,spinning,page,updateShow} = this.state
        return(
            <div className={Style.content}>
                <Card title='管理员列表'>
                    {/* 数据源 dataSource  表头 columns */}
                    {/* 发起ajax时出来，请求成功消失 */}
                    <Spin spinning={spinning}>
                        <Table
                        pagination={false}
                        dataSource={dataSource} 
                        columns={this.columns}></Table>
                        <Pagination className={Style.page} simple Current={page} total={total} pageSize={pageSize}
                            onChange={this.pageChange}
                        />
                    </Spin>
                </Card>
                {!updateShow || <RootUpdate cancelUpdate={this.cancelUpdate} data={this.data}></RootUpdate>}
            </div>
        )
    }
}
export default RootList
