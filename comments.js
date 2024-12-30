//Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/comments', (req, res) => {
  const comments    = fs.readFileSync(path.join(__dirname, 'comments.json'));   // Read the comments.json file          
  const commentsObj = JSON.parse(comments); // Parse the JSON to an object
  res.send(commentsObj); // Send the object as a response
});

app.post('/comments', (req, res) => {
    const comments    = fs.readFileSync(path.join(__dirname, 'comments.json'));   // Read the comments.json file
    const commentsObj = JSON.parse(comments); // Parse the JSON to an object
    commentsObj.push(req.body); // Push the new comment to the object
    fs.writeFileSync(path.join(__dirname, 'comments.json'), JSON.stringify(commentsObj)); // Write the object to the file
    res.send(commentsObj); // Send the object as a response
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});





