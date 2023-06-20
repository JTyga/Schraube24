const express = require('express');
const mongoose = require('mongoose');
const app = express();

//Importiere das Schrauben Model
const schraubenModel = require('./schraubenModel');

// Connect to MongoDB
mongoose.connect('mongodb+srv://andyemich1:x4Q5i6CB95GZhLTO@cluster0.nupegyk.mongodb.net/schrauben24?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('MongoDB connected...');
})
.catch(err => console.log(err));

//Hauptseite auf Port 3000
app.get('/', (req, res) => {
  res.send('Schraube ist der Neue Nagel!');
});

// GET-Route für den Verkauf einer bestimmten Schraube
app.get('/sales/:id', (req, res) => {
    const productId = req.params.id;
    schraubenModel.find({'produkt_id': productId}).exec().then((schrauben)=>{
    console.log(schrauben);
    res.send(schrauben);
    
    });
});

// diese Route zeigt alle DB Elemente an
app.get('/alle', (req, res) => {
  schraubenModel.find({}).exec().then((schrauben)=>{
    console.log(schrauben);
    res.send(schrauben);

  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));