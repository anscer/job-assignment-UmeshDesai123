const express = require('express');
const cors = require('cors');
require("dotenv").config();
const session = require("express-session");
const mongoDbsession = require("connect-mongodb-session")(session);

//Database connection
const db = require('./database');
const UserRouter = require('./routers/userRouter');
const StateRouter = require('./routers/stateRouter');
const isAuth = require('./middlewares/authMiddleware');

const app = express();
const PORT = process.env.PORT || 8001;
const store = new mongoDbsession({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

//middleware
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    store: store,
    resave: false,
    saveUninitialized: false,
  })
);

app.get('/', (req, res)=>{
  res.send({
    message: 'server running'
  });
});

//routers
app.use('/user', UserRouter);
app.use('/state', isAuth, StateRouter)

app.listen(PORT, ()=>{
  console.log('server running on port 8001')
});