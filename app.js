const express = require('express');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));

// app.use('/api', apiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`the server is listening at http://localhost:${PORT}`);
});
