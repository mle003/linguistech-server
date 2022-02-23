const mysql = require("mysql");
const { hashMd5, signToken, verifyToken } = require("../utils");


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'kingdevil07',
  database: 'app',
})

const handlers = {
  async signUp(req, res, next) {
    try {
      const { email, password, name, } = req.body
      db.query('SELECT email FROM user WHERE email = ?', [email], (error, result) => {
        if(error) {
          console.log(error)
        }
        if(result.length > 0) {
          res.status(400)
          res.json({
            error: {
              message: 'Email already existed'
            }
          })
          return
        }
        let hashedPassword = hashMd5(password)
        db.query('INSERT INTO user SET ?', {name: name, email: email, password: hashedPassword }, (error, result) => {
          if(error) {
            console.log(error)
          } else {
            console.log('register result', result)
            res.json({
              id: result.insertId,
              name: name,
              email: email
            })
          }
        })

      })

    } catch (error) {
      error.status = 400
      next(err)
    }
  },

  async SignIn(req, res, next) {
    try {
      const { email, password } = req.body
      if (!email) {
        throw new Error("Missing Email!");
      }
      if (!password) {
        throw new Error("Missing Password!");
      }
      let formattedEmail = String(email).toLowerCase().trim();
      let hashedPassword = hashMd5(String(password)); // crypto pass
      db.query('SELECT * FROM user WHERE email = ?', [formattedEmail], (error, result) => {
        if(error) {
          console.log(error)
        }
        if(result.length == 0) {
          res.status(400)
          res.json({
            error: {
              message: 'Email is not registered'
            }
          })
          return
        }
        if(result[0].password != hashedPassword) {
          res.status(400)
          res.json({
            error: {
              message: 'Wrong password',
            }
          })
          return
        }
        else {
          let accessToken = signToken({_id: result[0], email: result[0].email});
          res.json({
            id: result[0].id,
            email: result[0].email,
            name: result[0].name,
            accessToken: accessToken

          })
        }
      })


    } catch (error) {
      error.status = 400
      next(err)
    }
  }
}

module.exports = handlers