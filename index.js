const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Joi = require('joi');
const boom = require('boom');
const cors = require('cors');
const { ObjectId } = require('mongodb');

const app = express();
const { MongoClient } = require('mongodb');

// Connection URL
const mongodb_username = process.env.MONGODB_USERNAME;
const mongodb_password = process.env.MONGODB_PASSWORD;
const dbName = 'test';

const uri =
  'mongodb+srv://' +
  mongodb_username +
  ':' +
  mongodb_password +
  '@cluster0.fpm5lhj.mongodb.net/' +
  dbName +
  '';
console.log(uri);

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
    db = client.db(dbName);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
}
connectToDatabase();

app.use(bodyParser.json()); // Add JSON body parser middleware
app.get('/api/cards', (req, res) => {
  db.collection('cards')
    .find()
    .toArray((err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(boom.internal());
      }
      res.json(result);
    });
});
app.post('/api/cards', (req, res) => {
  const card = { name: req.body.name, description: req.body.description };
  db.collection('cards').insertOne(card, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json(boom.internal());
    }
    console.log('Card created');
    res.send('Card created');
  });
});
app.put('/api/card/:id', (req, res) => {
  const card = { name: req.body.name, description: req.body.description };
  db.collection('cards').updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: card },
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(boom.internal());
      }
      console.log('Card updated');
      res.send('Card updated');
    }
  );
});
app.delete('/api/card/:id', (req, res) => {
  db.collection('cards').deleteOne(
    { _id: new ObjectId(req.params.id) },
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(boom.internal());
      }
      console.log('Card deleted');
      res.send('Card deleted');
    }
  );
});

// Start the server
app.listen(3000, () => console.log('Server listening on port 3000'));
