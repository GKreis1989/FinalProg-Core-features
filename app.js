import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import express from 'express';
const app = express();

import configRoutes from './routes/index.js';

const staticDir = express.static(__dirname + '/public');
const pagesDir = express.static(__dirname + '/pages');

app.use('/public', staticDir);
app.use('/', pagesDir);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

configRoutes(app);

app.listen(3000, async () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});