const transactionTypeQuery = function(type){
    if(type === 'expense'){
        return ({expense:true, income:false})
    }
    if(type=== 'income'){
        return ({expense:false, income:true})
    }
}

export{transactionTypeQuery}