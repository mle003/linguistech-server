const mysql = require("mysql")

//create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'kingdevil07',
  database: 'app',
})

//connect
db.connect((err) => {
  if(err) {
    throw err
  }
  console.log('MySQL connnected')
});