const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const keys = require('./keys');
const postRouter = require('./routes/post');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 5000;
const clientPath = path.join(__dirname, 'client');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected.'))
    .catch(err => console.error('Error occured: ' + err));

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://alex_khz:1384@firstcluster-ce0pd.mongodb.net/test?retryWrites=true";
// const client = new MongoClient(keys.mongoURI, { useNewUrlParser: true });
// client.connect()
//     .then(() => console.log('MongoDB connected.'))
//     .catch(err => console.error(err));
// client.connect(err => {
//   //const collection = client.db("db1").collection("coll1");
//   //const collection = client.db('db-blog').collection('posts');
//   // perform actions on the collection object
//   if(err) {
//       console.error('Error occured: ' + err);
//   } else {
//       console.log('DB connected...');
//   }
//   //client.close();
// });
// client.connect()
//     .then(() => console.log('MongoDB connected...'))
//     .catch(err => console.error('Error occured: ' + err));

// MongoClient.connect(keys.mongoURI, { useNewUrlParser: true }, function(err, client) {
//     const collection = client.db('db-blog').collection('posts');
//     console.log('MongoDB connected...');
//     client.close();
// });

app.use(bodyParser.json());
app.use('/api/post', postRouter);
app.use(express.static(clientPath));

app.listen(port, () => {
    console.log(`Server has been started on port ${port}`);
});