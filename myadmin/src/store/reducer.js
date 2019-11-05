const State={
    tokenModal:true
}
export default (prevState=State,action)=>{
    let newData=JSON.parse(JSON.stringify(prevState))    
    let {type,params}=action
    switch (type) {
        case 'CHANGE_TOKENMODAL':
        newData.tokenModal=params
        break;
    
        default:
        break;
    }
    return newData
}