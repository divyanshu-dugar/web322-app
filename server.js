const express = require('express');
const path = require('path');
const storeService = require('./store-service');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.redirect('/about');
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/about.html'));
});

// Adding routes to interact with store-service.js

app.get('/shop', (req, res) => {
  storeService.getPublishedItems()
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ message: err }));
});

app.get('/items', (req, res) => {
  storeService.getAllItems()
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ message: err }));
});

app.get('/categories', (req, res) => {
  storeService.getCategories()
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ message: err }));
});

app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

storeService.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`Express http server listening on port ${port}`);
    });
  })
  .catch(err => {
    console.error(`Failed to initialize store service: ${err}`);
});
