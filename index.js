const express = require("express");
const morgan = require('morgan');

const bowRoute = require('./routes/Bow');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

morgan.token("body", (req, res) => JSON.stringify(req.body));

app.use(
  morgan(
    ":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]"
  )
);

app.use('/api', bowRoute);

app.listen(PORT, () => {
  console.log(`[ index.js ] Listening on port ${PORT}`);
});

