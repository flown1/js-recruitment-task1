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
    this.letters = "abcdefghijklmnoprstuwxyz"
};
UserDataGenerator.prototype.generateFakeName = function(){
    const nameLength = Math.floor((Math.random() * 15) + 3);
    return Math.random().toString(36).substring(7).replace(/[0-9]/g, 'x');
};
UserDataGenerator.prototype.generateBirthDate = function(){
    
    function randomFromRange(start,end){
        return Math.floor((Math.random() * (end - start + 1) + start));
    };
    var randDate = {
        day:    randomFromRange(1,03),
        month:  randomFromRange(0,11),
        year:   randomFromRange(1930,2000)
    };
    console.log("d: ", randDate.day);
    console.log("m: ", randDate.month);
    console.log("y: ", randDate.year);
    
    const randomizedDate = new Date(randDate.year, randDate.month, randDate.day, 0, 0 ,0 ,0 ); 
    console.log(randomizedDate);
    return randomizedDate;
}
UserDataGenerator.prototype.generatePeselFromBirthDate = function(birthDate){
    // console.log(birthDate);
    // console.log(birthDate.getFullYear());
}
UserDataGenerator.prototype.generateRecords = function(ammount){
    console.log("Generating...");
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

function DataTable() {
    this.records = new UserDataGenerator().generateRecords(200)
};
DataTable.prototype.displayTable = function(){ return console.log(this.records)};

var usersTable = new DataTable();
usersTable.displayTable();
