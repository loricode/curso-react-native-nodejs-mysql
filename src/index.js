const express = require('express');
const app = express(); // objeto app
const cors = require('cors');
const db = require('./database');

app.set('port', process.env.PORT || 4000 );

app.use(cors());
app.use(express.json());

app.get('/' , (req, res) => {
    const query = "SELECT * FROM products";  
    db.query(query, function(error, results, fields){
      res.json(results)
    });
});

app.post('/' , (req, res) => {
    const obj = req.body
    const query = "INSERT INTO products SET ?";  
    db.query(query, obj, function(error, results, fields){
       res.json(results.insertId)
    });
});

app.delete('/:id', (req, res) => {
   const { id } = req.params
   const query = "DELETE FROM products WHERE id = ?"; 
   db.query(query, id, function(error, results, fields){
      res.json({"msg":"removed"})
   });
});

app.listen(app.get('port'), () => {
  console.log("listening")
});
