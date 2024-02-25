
//Server Code need to run on server

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

    app.use(cors());

    app.use(routes);

    // Set up HTTPS server
    const httpsOptions = {
      key: fs.readFileSync(
        "/etc/letsencrypt/live/www.bluepiemeta.com/privkey.pem"
      ),
      cert: fs.readFileSync(
        "/etc/letsencrypt/live/www.bluepiemeta.com/fullchain.pem"
      ),
    };
    const httpsPort = process.env.HTTPS_PORT || 443;
    const server = require("https").createServer(httpsOptions, app);
    console.log(`Production HTTPS server is running on port ${httpsPort}`);

    // Start the server
    server.listen(process.env.PORT || 4000, () => {
      console.log(`Server is running`);
    });

    server.on("error", (error) => {
      console.error("Server error:", error);
    });
  } catch (error) {
    console.error("Error during server setup:", error);
  }
};

main();
