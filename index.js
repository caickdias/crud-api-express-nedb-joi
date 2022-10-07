const express = require("express");

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`[ index.js ] Listening on port ${PORT}`);
});

// Create
app.post("/api/students", async (req, res, next) => {
 
});

