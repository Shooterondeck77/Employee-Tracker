const db = require("./config/connection")

db.connect(function (err) {
    if (err) throw err
    console.log("MySQL Connected")
    mainMenu();
});

const mainMenu = () => {
    
}