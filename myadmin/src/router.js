import React,{Fragment} from 'react'
import {HashRouter,Link,Switch,Route,withRouter,Redirect} from 'react-router-dom'
import loadable from './utils/loadable' //方法
// import Login from './pages/login/login'
// import Admin from './pages/admin/admin'
// import Admin from './pages/admin/loadable'
// import Home from './pages/home/home'
// import User from './pages/user/user'
const Login =loadable(()=>import('./pages/login/login'))
const Admin =loadable(()=>import('./pages/admin/admin'))
const Home =loadable(()=>import('./pages/home/home'))
const User =loadable(()=>import('./pages/user/user'))
const RootList =loadable(()=>import('./pages/rootlist/rootlist'))
const RootAdd =loadable(()=>import('./pages/rootadd/rootadd'))
const Advertising =loadable(()=>import('./pages/advertising/advertising'))

class RootRoute extends React.Component{
    render(){
        return(
            <HashRouter>
                <Switch>
                    <Redirect exact from='/' to='/login'></Redirect>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/admin' component={()=>{
                        return(
                            <Admin>
                                <Route path='/admin/home' component={Home}></Route>
                                <Route path='/admin/user' component={User}></Route>
                                <Route path='/admin/rootlist' component={RootList}></Route>
                                <Route path='/admin/rootadd' component={RootAdd}></Route>
                                <Route path='/admin/advertising' component={Advertising}></Route>
                            </Admin>
                        )
                    }}></Route>
                </Switch>
            </HashRouter>
        )
    }
}
export default RootRoute