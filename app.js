var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const passport = require("passport");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo")
const connectDB = require("./utils/db");
require('dotenv').config();



//*requiring the files containing routes
var indexRouter = require("./routes/index");
var postRouter = require("./routes/multer/posts");
var prfImgRouter = require("./routes/multer/prf-img");
var usersRouter = require("./models/user");
var loginRouter = require("./routes/auth/login");
var signupRouter = require("./routes/auth/sign-up");
var logoutRouter = require("./routes/auth/logout");
var toggleLikePostRouter = require("./routes/toggleLikePost");

//*database connect
connectDB();

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//auth related middlewares
app.use(
  expressSession({
    resave: true,
    saveUninitialized: true,
    secret: "dark mode",
    store: new MongoStore({ mongoUrl:process.env.MONGO_URL }),
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, //! 7 days
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(usersRouter.serializeUser());
passport.deserializeUser(usersRouter.deserializeUser());

///
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//*static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));

app.use("/", indexRouter);
app.use("/", postRouter);
app.use("/", prfImgRouter);
app.use("/", loginRouter);
app.use("/", signupRouter);
app.use("/", logoutRouter);
app.use("/", toggleLikePostRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
