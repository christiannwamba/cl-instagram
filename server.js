// ./index.js
require('dotenv').config();
const Express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const uuid = require('uuid/v4');
const app = Express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const adapter = new FileSync('db.json');
const db = low(adapter);

app.set('port', 8070);

// yet to be created
// app.use(require('./middleware/db').connectDisconnect);
// require('./routes')(app);

app.post('/posts', (req, res) => {
  const post = Object.assign({}, req.body, {
    id: uuid(),
    created_at: new Date()
  });
  db
    .get('posts')
    .push(post)
    .write();
  const newPost = db
    .get('posts')
    .last()
    .value();
  res.json(newPost);
});

app.get('/posts', (req, res) => {
  // console.log(req.query.offset, req.query.limit);
  console.log(parseInt(req.query.offset) - 1, parseInt(req.query.limit));
  const posts = db
    .get('posts')
    .orderBy(['created_at'], ['desc'])
    .slice(parseInt(req.query.offset) - 1)
    .take(parseInt(req.query.limit))
    .value();
  const count = db.get('posts').value().length;
  res.json({ posts: posts, count: count });
});

app.listen(app.get('port'), _ => console.log('App at ' + app.get('port')));
