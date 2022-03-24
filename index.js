// require("./connect-sql")
require("./connect-mongo")

const express = require("express")
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require('cors')

const router = require("./router")
const template = require("./template")

const app = express()

const port = 9000;

app.use(bodyParser.json({
  extended: true,
  limit: '50mb'
}));

app.use(cors())
app.use(
  session({
    secret: "dmquan",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 12 * 60 * 60}
  })
)


app.use(router);


app.use((err, req, res, next) => {
  if (err)
    res.json(template.failedRes(err.message));
});

app.use(express.static("public"));

app.listen(process.env.PORT || port, (err) => {
  console.log(err || `Server opened at port '${port}'`);
})


