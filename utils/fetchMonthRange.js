// function returns first and last date of a month
const monthRange = function(month, year){
    var firstDate = new Date(year, month, 1);
    var lastDate = new Date(year, month + 1, 0);
    return [firstDate, lastDate]
}

export{monthRange}
