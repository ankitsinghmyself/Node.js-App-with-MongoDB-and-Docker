const express = require('express');
const boom = require('boom');
const fs = require('fs');
const marked = require('marked');
const path = require('path');
const { ObjectId } = require('mongodb');

const app = express();
const { MongoClient } = require('mongodb');

// Connection URL
const mongodb_username = process.env.MONGODB_USERNAME;
const mongodb_password = process.env.MONGODB_PASSWORD;
const mongodb_hostname =
  process.env.MONGODB_HOSTNAME || 'cluster0.fpm5lhj.mongodb.net';
const mongodb_database = process.env.MONGODB_DATABASE || 'test';

const uri =
  'mongodb+srv://' +
  mongodb_username +
  ':' +
  mongodb_password +
  '@' +
  mongodb_hostname +
  '/' +
  mongodb_database +
  '';

// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db; // Define db variable outside of the client.connect callback

// Use connect method to connect to the Server
async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    db = client.db(mongodb_database);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
}

connectToDatabase();

app.use(express.json());

app.get('/api/cards', async (req, res) => {
  try {
    const result = await db.collection('cards').find().toArray();
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(boom.internal());
  }
});

app.post('/api/cards', async (req, res) => {
  try {
    const card = { name: req.body.name, description: req.body.description };
    const result = await db.collection('cards').insertOne(card);
    console.log('Card created');
    res.send('Card created');
  } catch (err) {
    console.log(err);
    res.status(500).json(boom.internal());
  }
});

app.put('/api/card/:id', async (req, res) => {
  const card = { name: req.body.name, description: req.body.description };
  try {
    const result = await db
      .collection('cards')
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: card });
    console.log('Card updated');
    res.send('Card updated');
  } catch (err) {
    console.log(err);
    res.status(500).json(boom.internal());
  }
});

app.delete('/api/card/:id', async (req, res) => {
  try {
    const result = await db
      .collection('cards')
      .deleteOne({ _id: new ObjectId(req.params.id) });
    console.log('Card deleted');
    res.send('Card deleted');
  } catch (err) {
    console.log(err);
    return res.status(500).json(boom.internal());
  }
});

// Serve the README.md file on the root URL
app.get('/', async (req, res) => {
  try {
    const readmePath = path.join(__dirname, 'README.md');
    const readmeContent = await fs.promises.readFile(readmePath, 'utf8');
    res.send(marked(readmeContent));
  } catch (err) {
    console.log(err);
    return res.status(500).json(boom.internal());
  }
});

app.use(async (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(3000, () => console.log('Server listening on port 3000'));
