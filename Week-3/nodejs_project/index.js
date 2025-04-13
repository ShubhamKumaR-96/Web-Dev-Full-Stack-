const express = require("express");
const requestLog = require("./src/middleware/requestLogger");

const app = express();

app.use(requestLog);



app.listen(4000, () => {
    console.log('Server running on http://localhost:4000');
  });
