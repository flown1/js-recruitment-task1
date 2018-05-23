function User(firstName, lastName, birthDate, pesel){
    return {
        firstName:  firstName,
        lastName:   lastName,
        birthDate:  birthDate,
        pesel:      pesel
    }
}

function UserDataGenerator() {
    this.usedPeselNumbers   = [];
    this.dataConstraints = {
        MAX_NAME_LENGTH: 15,
        MIN_NAME_LENGTH: 3
    }
};
UserDataGenerator.prototype.randomFromRange = function(start,end){
    return Math.floor((Math.random() * (end - start + 1) + start));
}
UserDataGenerator.prototype.generateFakeName = function(){
    const nameLength = Math.floor((Math.random() * this.dataConstraints.MAX_NAME_LENGTH) + this.dataConstraints.MIN_NAME_LENGTH);
    var name = "";
    
    for(var i = 0; i < nameLength; i++){
        var randomCharCode = Math.floor(Math.random() * 25) + 97;
        name = name.concat(String.fromCharCode(randomCharCode));
    }
    return name.substring(0,1).toLocaleUpperCase() + name.substring(1,name.length);
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
    var pesel =   birthDate.getUTCFullYear().toString().substring(2,4) +
                    formatter.toTwoDecimals(birthDate.getUTCMonth()) +
                    formatter.toTwoDecimals(birthDate.getUTCDate());
    
    var tempPesel = pesel;
    do{
        tempPesel = tempPesel.concat(this.randomFromRange(10000, 99999).toString());
    }while(!this.usedPeselNumbers.indexOf(tempPesel))
    pesel = tempPesel;
    this.usedPeselNumbers.push(pesel);
    return pesel;
}
UserDataGenerator.prototype.generateRecords = function(ammount){
    const users = new Array(ammount);
    const userDataGenerator = new UserDataGenerator();

    for(i = 0; i < ammount; i++){
        const randomizedBirthDate = userDataGenerator.generateBirthDate();
        users[i] = new User(userDataGenerator.generateFakeName(), 
                            userDataGenerator.generateFakeName(), 
                            randomizedBirthDate,
                            userDataGenerator.generatePeselFromBirthDate(randomizedBirthDate)
                        );
    }
    return users;
}