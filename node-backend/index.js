let express = require('express'),
  path = require('path'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  mongoDb = require('./database/db');
 
mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
    console.log('Database sucessfully connected ')
  },
  error => {
    console.log('Database error: ' + error)
  }
)
 
const productsRoute = require('./routes/products.routes');
const userRoutes = require("./routes/user.routes"); 
 
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors()); 
 
// API root
app.use('/api', productsRoute);
app.use('/api', userRoutes);
 
// PORT
const port = process.env.PORT || 8080;
 
app.listen(port, () => {
  console.log('Listening on port ' + port)
})
 
// 404 Handler
app.use((req, res, next) => {
  next(createError(404));
});
 
// Base Route
app.get('/', async (req, res) => {
  const status = 200;

  if (status === 200) {
    const result = await Promise.resolve('data');
    return res.send(result);
  } else if (status === 404) {
    const err = await Promise.resolve('page not found');
    return res.send(err);
  }

  return res.send('Server error');
});
 
// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});