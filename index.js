const express = require("express");
const morgan = require('morgan');

var cors = require('cors');
const bowRoute = require('./routes/bow');
const authRoute = require('./routes/auth');

const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

morgan.token("body", (req, res) => JSON.stringify(req.body));

app.use(
  morgan(
    ":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]"
  )
);

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use('/api', bowRoute);
app.use('/api/', authRoute);

app.listen(PORT, () => {
  console.log(`[ index.js ] Listening on port ${PORT}`);
});

