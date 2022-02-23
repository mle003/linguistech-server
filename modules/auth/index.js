const userModel = require("./model")
const template = require("../../template")
const { hashMd5, signToken, verifyToken } = require("../utils");

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

      if (!user) {
        throw new Error("Invalid email");
      }
      if (user.password != hashedPassword) {
        throw new Error("Invalid password");
      }

      let userData = user.toObject()

      let accessToken = signToken({ _id: userData, userName: userData.userName })
      userData.accessToken = accessToken

      res.json(template.successRes(userData))


    } catch (error) {
      error.status = 400
      next(err)
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
      let accessToken = signToken({ _id: userData, userName: userData.userName });
      userData.accessToken = accessToken;

      res.json(template.successRes(userData));
    } catch (error) {
      error.status = 400
      next(error);
    }
  }
}

module.exports = handlers