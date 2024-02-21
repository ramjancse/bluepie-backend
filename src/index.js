// require("dotenv").config();
// const bodyParser = require("body-parser");
// const http = require("http");
// // const app = require('./app')
// const { connectDB } = require("./db/index");
// const express = require("express");
// const app = express();
// const morgan = require("morgan");
// const port = process.env.PORT || 4000;
// const routes = require("./routes/index");
// app.use(bodyParser.json());
// const cors = require('cors');
// const main = async () => {
//   try {
//     await connectDB();
//     app.use(morgan("dev"));
    
//     app.use(cors({
//       origin: 'http://localhost:3000'
//     }));
    

//     app.use(routes)
//     // app.post("/api/v1/auth/register", (req, res) => {
//     //   console.log(req.body); 
//     //   res.status(200).json({
//     //     code: "200",
//     //     statusbar: "ok",
//     //     message: "Successful",
//     //   });
//     // });




//     app.listen(port, async () => {
//       console.log("server is listening on port number 4000");
//     });

    
//   } catch (error) {
//     console.log(error);
//   }
// };

// main();
require("dotenv").config();
const bodyParser = require("body-parser");
const http = require("http");
const { connectDB } = require("./db/index");
const express = require("express");
const app = express();
const morgan = require("morgan");
const routes = require("./routes/index");
app.use(bodyParser.json());
const cors = require('cors');
const fs = require('fs');

const main = async () => {
  try {
    await connectDB();
    app.use(morgan("dev"));
    
    app.use(cors({
      origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
    }));
    
    app.use(routes);

    let server;

    // Check the environment to decide whether to use HTTP or HTTPS
    if (process.env.NODE_ENV === 'production') {
      // Set up HTTPS server
      const httpsOptions = {
        key: fs.readFileSync('/etc/letsencrypt/live/www.bluepiemeta.com/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/www.bluepiemeta.com/cert.pem')
      };
      const httpsPort = process.env.HTTPS_PORT || 443;
      server = require('https').createServer(httpsOptions, app);
      console.log(`Production HTTPS server is running on port ${httpsPort}`);
    } else {
      // Set up HTTP server (for local development)
      const httpPort = process.env.HTTP_PORT || 4000;
      server = require('http').createServer(app);
      console.log(`Development HTTP server is running on port ${httpPort}`);
    }

    // Start the server
    server.listen(process.env.PORT || 4000, () => {
      console.log(`Server is running`);
    });
    
  } catch (error) {
    console.log(error);
  }
};

main();