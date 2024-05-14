const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js');
const { PORT } = require('./constants/constants.js');
const cors = require('cors')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

//app.set('view engine', 'ejs');
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});