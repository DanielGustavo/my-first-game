const express = require('express');
const path = require('path');

const app = express();

app.use('/static', express.static('src'));

app.get('/', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'src', 'displayer.html'));
});

app.listen(9000, () => {
  console.log('[server] started!');
});
