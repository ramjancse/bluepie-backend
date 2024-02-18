require("dotenv").config();
const bodyParser = require("body-parser");
const http = require("http");
// const app = require('./app')
const { connectDB } = require("./db/index");
const express = require("express");
const app = express();
const morgan = require("morgan");
const port = process.env.PORT || 4000;
const routes = require("./routes/index");
app.use(bodyParser.json());
const cors = require('cors');
const main = async () => {
  try {
    await connectDB();
    app.use(morgan("dev"));
    
    app.use(cors({
      origin: 'http://localhost:3000'
    }));
    

    app.use(routes)
    // app.post("/api/v1/auth/register", (req, res) => {
    //   console.log(req.body); 
    //   res.status(200).json({
    //     code: "200",
    //     statusbar: "ok",
    //     message: "Successful",
    //   });
    // });




    app.listen(port, async () => {
      console.log("server is listening on port number 4000");
    });
  } catch (error) {
    console.log(error);
  }
};

main();
