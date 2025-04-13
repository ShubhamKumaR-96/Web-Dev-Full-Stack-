const express = require("express");
const requestLog = require("./src/middleware/requestLogger");
const calculator = require("./src/middleware/calculator");

const app = express();

app.use(requestLog);

app.get('/calculate/:operation/:a/:b', calculator);



app.listen(4000, () => {
    console.log('Server running on http://localhost:4000');
  });
