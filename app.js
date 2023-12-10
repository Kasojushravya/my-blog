const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static('public'));


// Connect to MongoDB
mongoose.connect('mongodb+srv://kasojushravya:shravya178@cluster0.si7kjs2.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

// Create Post model
const Post = mongoose.model('Post', {
  title: String,
  content: String,
  date: { type: Date, default: Date.now }
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Home route - display all posts
app.get('/', async (req, res) => {
  const posts = await Post.find().sort({ date: 'desc' });
  res.render('index', { posts });
});

// New post route - display form
app.get('/new', (req, res) => {
  res.render('new');
});

// Create new post route
app.post('/new', async (req, res) => {
  const { title, content } = req.body;
  const post = new Post({ title, content });
  await post.save();
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
