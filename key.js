// console.log('this is loaded');
require('dotenv').load();
exports.spotify = {
  // You'll use this instead of your api key (proces.env.SPOTIFY_ID) and (process.env.SPOTIFY_SECRET)

  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};