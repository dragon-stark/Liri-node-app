console.log('this is loaded');

require('dotenv').load();
exports.spotify = {
  // You'll use this instead of your api key
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};