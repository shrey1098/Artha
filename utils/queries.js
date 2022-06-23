import {transactionTypeQuery} from "../utils/transactionTypeQuery.js"

var transactionAllFieldsPost = function(googleId, req){
    var query = {googleId: googleId,
    date: new Date(req.body.date),
    coordinates:req.body.coordinates,
    category:{
        main:req.body.category.main,
        subCategory:req.body.category.subCategory,
    },
    particular:req.body.particular,
    transactionType:{
        expense:req.body.transactionType.expense,
        income:req.body.transactionType.income
    },
    amount:req.body.amount,
    note:req.body.note,
}
return query
}

var transactionByDatesQuery = function(googleId, transactionType, fromDate, toDate){
    var query = {
        googleId: googleId,
    date:{
        $gte: new Date(fromDate).toISOString(),
        $lte: new Date(toDate).toISOString(),
    },
    trasactionType: transactionTypeQuery(transactionType)
}
return query
}

export{transactionAllFieldsPost,  transactionByDatesQuery}