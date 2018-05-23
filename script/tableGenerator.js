function DataTable() {
    this.records = new UserDataGenerator().generateRecords(200);
    this.filteredRecords = this.records;
    this.sortedAscending = false;
};
DataTable.prototype.displayTable = function(){
    var usersTableElem = document.getElementById("usersTable");
    var newUsersTableElem = document.createElement("table");
    newUsersTableElem.setAttribute("id", "usersTable");

    var tr  =   document.createElement("tr"),
        th  =   document.createElement("th"),
        tbody=  document.createElement("tbody"),
        thead=  document.createElement("thead"),
        text=   document.createTextNode("First Name");
    
    th.appendChild(text);
    th.setAttribute('onclick', "usersTable.onHeaderCellClick('firstNameHeader')");
    tr.appendChild(th);
    
    text = document.createTextNode("Last Name");
    th = document.createElement("th");
    th.setAttribute('onclick', "usersTable.onHeaderCellClick('lastNameHeader')");
    th.appendChild(text);
    tr.appendChild(th);

    text = document.createTextNode("Birth Date");
    th = document.createElement("th");
    th.setAttribute('onclick', "usersTable.onHeaderCellClick('birthDateHeader')");
    th.appendChild(text);
    tr.appendChild(th);

    text = document.createTextNode("Pesel");
    th = document.createElement("th");
    th.setAttribute('onclick', "usersTable.onHeaderCellClick('peselHeader')");
    th.appendChild(text);
    tr.appendChild(th);
    thead.appendChild(tr);

    var formatter = new Formatter;
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
        
        text = document.createTextNode(formatter.mmddyyyyDateFormat(record.birthDate));
        
        td = document.createElement("td");
        td.appendChild(text);
        tr.appendChild(td);
        
        text = document.createTextNode(record.pesel);
        td = document.createElement("td");
        td.appendChild(text);
        tr.appendChild(td);
        tbody.appendChild(tr);
    });
    newUsersTableElem.append(thead,tbody);
    usersTableElem.parentNode.replaceChild(newUsersTableElem, usersTableElem);
};
DataTable.prototype.searchBarInputHandler = function(){
    var inputText = document.getElementById("searchBar").value;
    // console.log(inputText);
    const formatter = new Formatter;
    this.filteredRecords = this.records;

    this.filteredRecords = this.filteredRecords.filter((record) => {
        return record.firstName.includes(inputText) 
                || record.lastName.includes(inputText) 
                || formatter.mmddyyyyDateFormat(record.birthDate).includes(inputText) 
                || record.pesel.includes(inputText);
    });
    console.log(this.filteredRecords);
    this.displayTable();
}
DataTable.prototype.sorting = function(type, key){
    if(type === 'asc'){
        if(key === 'firstName')
            this.filteredRecords.sort((a,b) =>{ 
                if (a.firstName < b.firstName)
                    return -1
                if ( a.firstName > b.firstName)
                    return 1
                return 0
            });
        else if(key === 'lastName')
            this.filteredRecords.sort((a,b) =>{ 
                if (a.lastName < b.lastName)
                    return -1
                if ( a.lastName > b.lastName)
                    return 1
                return 0
            });
        else if(key === 'birthDate')
            this.filteredRecords.sort((a,b) =>{ 
                if (a.birthDate < b.birthDate)
                    return -1
                if ( a.birthDate > b.birthDate)
                    return 1
                return 0
            });
        else if(key === 'pesel')
            this.filteredRecords.sort((a,b) =>{ 
                if (a.pesel < b.pesel)
                    return -1
                if ( a.pesel > b.pesel)
                    return 1
                return 0
            });
    }else if(type === 'desc'){
        if(key === 'firstName')
            this.filteredRecords.sort((a,b) =>{ 
                if (a.firstName > b.firstName)
                    return -1
                if ( a.firstName < b.firstName)
                    return 1
                return 0
            });
        else if(key === 'lastName')
            this.filteredRecords.sort((a,b) =>{ 
                if (a.lastName > b.lastName)
                    return -1
                if ( a.lastName < b.lastName)
                    return 1
                return 0
            });
        else if(key === 'birthDate')
            this.filteredRecords.sort((a,b) =>{ 
                if (a.birthDate > b.birthDate)
                    return -1
                if ( a.birthDate < b.birthDate)
                    return 1
                return 0
            });
        else if(key === 'pesel')
            this.filteredRecords.sort((a,b) =>{ 
                if (a.pesel > b.pesel)
                    return -1
                if ( a.pesel < b.pesel)
                    return 1
                return 0
            });
    }
}
DataTable.prototype.onHeaderCellClick = function(whichCell){
    switch(whichCell){
        case 'firstNameHeader':
           if(!this.sortedAscending)
                this.sorting('asc','firstName');
            else
                this.sorting('desc', 'firstName');
        break;
        case 'lastNameHeader':
            if(!this.sortedAscending)
                this.sorting('asc','lastName');
            else
                this.sorting('desc', 'lastName');
        break;
        case 'birthDateHeader':
            if(!this.sortedAscending)
                this.sorting('asc','birthDate');
            else
                this.sorting('desc', 'birthDate');
        break;
        case 'peselHeader':
            if(!this.sortedAscending)
                this.sorting('asc','pesel');
            else
                this.sorting('desc', 'pesel');
        break;    
    }
    this.sortedAscending = !this.sortedAscending;
    setTimeout(this.displayTable(), 1000);
}