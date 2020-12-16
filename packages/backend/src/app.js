require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

// const postRoutes = require('./routes/blog');
const userRoutes = require('./routes/user');
const userAdminRoutes = require('./routes/admin/user');
const authRoutes = require('./routes/auth');

const app = express();

// Image upload
const fileStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'images');
  },
  filename(req, file, cb) {
    cb(null, uuidv4() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json());
app.use(
  multer({ storage: fileStorage, fileFilter }).single('image')
);
app.use('/images', express.static(path.join(__dirname, 'images')));

// CORS Headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// app.use('/api', postRoutes);
app.use('/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/admin', userAdminRoutes);

// err handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode;
  const { message } = error;
  const { data } = error;
  res.status(status).json({ message, data });
});

// database connection
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose
  .connect(
    'YOUR MONGODB ACCESS URI'
  )
  .then(() => {
    app.listen(8080);
    console.log('Connection to the database established');
  })
  .catch((err) => console.log(err));
