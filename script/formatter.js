function Formatter() {};
Formatter.prototype.toTwoDecimals = function(num){
    if(num<10){ return "0" + num.toString();}
    else return num;
} 
Formatter.prototype.mmddyyyyDateFormat = function(date){
    return this.toTwoDecimals(date.getUTCMonth()) + "/" 
            + this.toTwoDecimals(date.getUTCDate()) + "/" 
            + date.getUTCFullYear();
}