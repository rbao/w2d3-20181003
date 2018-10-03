const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));

var starships = [
  { id: '1', name: 'Galleon', size: 'Huge' },
  { id: '2', name: 'Roy Ship', size: 'Tiny' },
  { id: '3', name: 'Enterprise', size: 'Massive' }
]

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/starships', (req, res) => {
  res.render('starships/index', {starships: starships});
});

app.get('/starships/new', (req, res) => {
  res.render('starships/new');
});

app.post('/starships', (req, res) => {
  // 1. Grab the form information by using body praser
  let newStarship = req.body;

  // 2. Save to the database
  starships.push(newStarship);

  // 3. Redirect to the list of ship
  //    res.redirect does 3 things:
  //    1. Set the status to 300 level
  //    2. Set the location header to the path you pass in
  //    3. Send the response
  res.redirect('/starships');
});

app.post('/starships/:id/delete', (req, res) => {
  // 0. Get the id of the starship
  let targetId = req.params.id;

  // 1. Find the target the starship we want to delete
  let targetShip = starships.find(function(starship) {
    return starship.id === targetId;
  });

  let targetIndex = starships.indexOf(targetShip);

  // 2. Delete it
  starships.splice(targetIndex, 1)

  // 3. Redirect to the list
  res.redirect('/starships');
});

const PORT = 3000;
app.listen(PORT, function() {
  console.log(`app listening on port ${PORT}!`);
});
