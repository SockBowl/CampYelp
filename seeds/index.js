const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();
const cities = require('./cities');
const { places, descriptors, reviews } = require('./seedHelpers');
const Campground = require('../models/campground');
const Review = require('../models/review');
const User = require('../models/user');

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const randomReview = async (users) => {
  return {
    body: reviews[Math.floor(Math.random() * reviews.length)],
    rating: Math.ceil(Math.random() * 5),
    author: users[Math.floor(Math.random() * users.length)]._id
  };
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  const users = await User.find({});

  const { resources } = await cloudinary.search
    .expression('folder=yelpcamp')
    .execute();
  await Campground.deleteMany({});

  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const imagesArr = [];
    for (let j = 0; j < 3; j++) {
      const randomImg = Math.floor(Math.random() * resources.length);
      imagesArr.push({
        url: resources[randomImg].secure_url,
        filename: resources[randomImg].public_id
      });
    }

    const camp = new Campground({
      author: users[Math.floor(Math.random() * users.length)]._id,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: imagesArr,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      price: price,
      geometry: {
        type: 'Point',
        coordinates: [cities[random1000].longitude, cities[random1000].latitude]
      },
      location: `${cities[random1000].city}, ${cities[random1000].state}`
    });

    for (let j = 0; j < 2; j++) {
      const randRev = await randomReview(users);
      const review = new Review(randRev);
      await review.save();
      await camp.reviews.push(review._id);
    }
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close().then(() => {
    console.log('Done seeding database');
  });
});
