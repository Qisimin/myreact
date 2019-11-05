export default {//给localstorage做一层封装
    getItem(key){
        let value=window.localStorage.getItem(key)
        return JSON.parse(value)
    },
    setItem(key,value){//localstorage中的value需要解析
        let str=JSON.stringify(value)
        window.localStorage.setItem(key,str)
    }
    // set 作用：  设置值的时候运行函数
    // get 作用： 获取值的时候运行函数
}