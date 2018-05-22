console.log("Table generating script has started...");

    //birthDate:  new Date(),//new birthDate().generate;
    //pesel:      99999999 //new Pesel().GenerateFromBirhday();
function User(firstName, lastName, birthDate, pesel){
    return {
        firstName:  firstName,
        lastName:   lastName,
        birthDate:  birthDate,
        pesel:      pesel
    }
}

function UserDataGenerator() {
    this.letters            = "abcdefghijklmnoprstuwxyz",
    this.usedPeselNumbers   = [];
};
function Formatter() {};
Formatter.prototype.toTwoDecimals = function(num){
    return ("0" + num).slice(-2);
} 
Formatter.prototype.mmddyyyyDateFormat = function(date){
    return this.toTwoDecimals(date.getMonth().toString()) + "/" 
            + this.toTwoDecimals(date.getDay().toString()) + "/" 
            + date.getFullYear();
}
UserDataGenerator.prototype.randomFromRange = function(start,end){
    return Math.floor((Math.random() * (end - start + 1) + start));
}
UserDataGenerator.prototype.generateFakeName = function(){
    const nameLength = Math.floor((Math.random() * 15) + 3);
    return Math.random().toString(36).substring(7).replace(/[0-9]/g, 'x');
}
UserDataGenerator.prototype.generateBirthDate = function(){ 
    var randDate = {
        day:    this.randomFromRange(1,30),
        month:  this.randomFromRange(0,11),
        year:   this.randomFromRange(1930,2000)
    };
    return new Date(randDate.year, randDate.month, randDate.day); 
}
UserDataGenerator.prototype.generatePeselFromBirthDate = function(birthDate){
    var formatter = new Formatter;
    var pesel =   birthDate.getFullYear().toString().substring(2,4) +
                    formatter.toTwoDecimals((birthDate.getMonth() + 1).toString()) +
                    formatter.toTwoDecimals(birthDate.getDay().toString());
    
    var tempPesel = pesel;
    do{
        tempPesel = tempPesel.concat(this.randomFromRange(10000, 99999).toString());
    }while(!this.usedPeselNumbers.indexOf(tempPesel))
    pesel = tempPesel;
    this.usedPeselNumbers.push(pesel);
    return pesel;
}
UserDataGenerator.prototype.generateRecords = function(ammount){
    console.log("Generating...");
    const users = new Array(ammount);
    const userDataGenerator = new UserDataGenerator();
    const formatter = new Formatter;

    for(i = 0; i < ammount; i++){
        const randomizedBirthDate = userDataGenerator.generateBirthDate();
        users[i] = new User(userDataGenerator.generateFakeName(), 
                            userDataGenerator.generateFakeName(), 
                            formatter.mmddyyyyDateFormat(randomizedBirthDate),
                            userDataGenerator.generatePeselFromBirthDate(randomizedBirthDate)
                        );
    }
    return users;
}

function DataTable() {
    this.records = new UserDataGenerator().generateRecords(200);
    this.filteredRecords = this.records;
};
DataTable.prototype.displayTable = function(){
    var usersTableElem = document.getElementById("usersTable");
    
    var tr  =   document.createElement("tr"),
        th  =   document.createElement("th"),
        tbody=  document.createElement("tbody"),
        text=   document.createTextNode("First Name");
    
    th.appendChild(text);
    tr.appendChild(th);

    text = document.createTextNode("Last Name");
    th = document.createElement("th");
    th.appendChild(text);
    tr.appendChild(th);

    text = document.createTextNode("Birthday");
    th = document.createElement("th");
    th.appendChild(text);
    tr.appendChild(th);

    text = document.createTextNode("Pesel");
    th = document.createElement("th");
    th.appendChild(text);
    tr.appendChild(th);
    tbody.appendChild(tr);
    usersTableElem.appendChild(tbody);

    this.filteredRecords.forEach(record => {
        var tr = document.createElement("tr"),
            td = document.createElement("td"),
        text = document.createTextNode(record.firstName);
        
        td = document.createElement("td");
        td.appendChild(text);
        tr.appendChild(td);
        text = document.createTextNode(record.lastName);
        
        td = document.createElement("td");
        td.appendChild(text);
        tr.appendChild(td);
        text = document.createTextNode(record.birthDate);
        
        td = document.createElement("td");
        td.appendChild(text);
        tr.appendChild(td);
        
        text = document.createTextNode(record.pesel);
        td = document.createElement("td");
        td.appendChild(text);
        tr.appendChild(td);
        tbody.appendChild(tr);
    });
    return console.log(this.records)
};
DataTable.prototype.searchBarInputHandler = function(){
    var inputText = document.getElementById("searchBar").value;
    console.log(inputText);
    this.filteredRecords = this.filteredRecords.filter((record) => {
        return record.firstName.includes(inputText) || record.lastName.includes(inputText) || record.birthDate.includes(inputText) || record.pesel.includes(inputText);
    });
    console.log(this.filteredRecords);
    this.displayTable();
};
var usersTable = new DataTable();
usersTable.displayTable();


