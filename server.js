const express = require('express')
const next = require('next')
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
pgSession = require("connect-pg-simple")(session);
// const enforce = require('express-sslify');
const db = require("./server/util/queries.js");
const fs = require("fs");
const path = require("path");
require('dotenv').config();

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express();

  server.use(cookieParser());
  server.use(bodyParser.json());

  let sess = {
	secret: process.env.NEXT_PUBLIC_ENV_SESHSECRET,
	resave: false,
	saveUninitialized: false,
	store: new pgSession({
		pool: db.pool,
		tableName: "session",
	}),
	cookie: {
		secure: false,
	},
  }

  server.use(session(sess));
  server.use(bodyParser.urlencoded({ extended: true }));

  server.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", true);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"*, Origin, set-cookie, X-Requested-With, Content-Type, Accept, Authorization, serverend, delete,entries,foreach,get,has,keys,set,values"
	);
	res.setHeader("Access-Control-Max-Age", "86400");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, PATCH, DELETE, OPTIONS"
	);
	res.setHeader("Access-Control-Max-Age", 86400);
	if (req.method === "OPTIONS") {
		return res.status(200).end();
	} else {
		next();
	}
    });


  server.all('*', (req, res) => {
    return handle(req, res)
  })
  server.use((error, req, res, next) => {
	if (req.file) {
		fs.unlink(req.file.path, (err) => {
			console.log(err);
		});
	}

	if (res.headerSent) {
		return next(error);
	}
	res.status(error.code || 500); // 500 means something went wrong on the server
	res.json({ message: error.message || "THERE WAS AN ERROR" });
    });

    // server.get("/*", (req, res) => {
    //     res.sendFile(path.join(__dirname, "build", "index.html"));
    // });


  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})