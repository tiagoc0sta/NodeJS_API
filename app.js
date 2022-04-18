const express = require('express');
const mongoose = require('mongoose');

require("./models/Artigo");
const Artigo = mongoose.model('artigo');

const app= express();

app.use(express.json());

mongoose.connect('mongodb://localhost/celke', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connection with MongoDB successfully done!");
}).catch((erro) => {
  console.log("Connection with MongoDB not successfully done!");
});

app.get("/", (req, res) => {
  res.json({title: "How to create an API?"});
});

app.post("/artigo", (req, res) => {
  const artigo = Artigo(req.body, (err) => {
    if (err) return res.status(400).json({
      error: true,
      message: "Error: Article not inserted"
    })
    
    return res.status(200).json({
      error: false,
      message: "Article successfully inserted !"
    })
  })
});

app.listen(8080, () => {
  console.log("Server running at port 8080: http://localhost:8080/");
})
