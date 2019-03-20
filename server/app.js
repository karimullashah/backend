const express = require('express');
require('./db/mongoose_config');
const usersRouter = require('../server/routes/user.route');
const venderRouter = require('../server/routes/vender.route');
const authRouter = require('../server/routes/auth.route');


const app = express();
const PORT = process.env.PORT;

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });

app.use(express.json())
app.use('/users',usersRouter); 
app.use('/venders',venderRouter);
app.use('/',authRouter);

app.listen(PORT, () => {
    console.log('Server is up on port ' + PORT)
})

