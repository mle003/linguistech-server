const userModel = require("./model")
const template = require("../../template")
const nodemailer = require('nodemailer')
const { hashMd5, signToken, verifyToken } = require("../utils");
const { reset } = require("nodemon");
 
const handlers = {
  async signIn(req, res, next) {
    try {
      const { userName, password } = req.body
      if (!password) {
        throw new Error("Missing Password!");
      }
      if (!userName) {
        throw new Error("Missing Username!");
      }
 
      let hashedPassword = hashMd5(String(password)); // crypto pass
 
      let user = await userModel.findOne({ userName: userName })
      console.log(typeof(user))
      if (!user) {
        throw new Error("Invalid username");
      }
      if (user.password != hashedPassword) {
        throw new Error("Invalid password");
      }
 
      let userData = user.toObject()
 
      let accessToken = signToken({ _id: userData, userName: userData.userName })
      userData.accessToken = accessToken
 
      res.json(template.successRes(userData))
 
 
    } catch (error) {
      res.status(400)
      next(error)
    }
  },
 
  async signUp(req, res, next) {
    try {
      let data = req.body
      let formattedData = {}
      if (
        typeof data.password != "string" ||
        !(data.password.length >= 6 && data.password.length <= 30)
      ) {
        throw new Error("Invalid password! Password must be between 6 and 30");
      }
 
 
      const existedUser = await userModel.findOne({ userName: data.userName })
      if(existedUser) {
        throw new Error ("Username has already existed")
      }
 
      const usedEmail = await userModel.findOne({ email: data.email })
 
      if(usedEmail) {
        throw new Error ("Email has already been used")
      }
 
      formattedData.password = hashMd5(data.password)
      formattedData.email = String(data.email).toLowerCase().trim();
      formattedData.userName = String(data.userName).toLowerCase().trim();
 
 
      let user = await userModel.create(formattedData)
      let userData = user.toObject()
      res.json(template.successRes(userData));
    } catch (error) {
      res.status(400)
      next(error);
    }
  },
 
  async forgotPassword(req, res, next) {
   
    const {email} = req.body
    try {
 
      let user = await userModel.findOne({ email: email})
      if(!user) {
        throw new Error("Email is not registered")
      }
      let userData = user.toObject()
      let testAccount = await nodemailer.createTestAccount()
 
      console.log('this')
      let token = signToken({ _id: userData, userName: userData.userName })
      let transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        }
      })
      const dataRes = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: "Linguistech Recover Password",
        text: "abcxyz",
        html: `
          <h2>Please click on given link to reset your password</h2>
          <p>${process.env.CLIENT_URL}/reset-password/${token}</p>
        `
 
      }
      let response = await new Promise((resolve, reject) => {
        transport.sendMail(dataRes, (err, info) => {
          if(err) {
            throw new Error(err)
          }
          resolve(info.response)
        })
      })
      res.json(template.successRes(response))
    } catch (error) {
      res.status(400)
      next(error)
    }
  },
 
  async resetPassword(req, res, next) {
    const { token, email, password } = req.body
    if(!verifyToken(token)) {
      res.status(400)
      next(new Error("Invalid access token!"));
      return
    }
    try {
      let newPassword = hashMd5(password)
      var myquery = { email: email };
      var newvalues = { $set: {password: newPassword } };
      let respone = await userModel.updateOne(
        myquery,
        newvalues
      )
      res.json(template.successRes(respone))
    } catch (error) {
      res.status(400)
      next(error)
    }
  }
}
 
module.exports = handlers

