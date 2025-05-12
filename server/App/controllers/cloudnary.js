const { v2: cloudinary } = require("cloudinary");
const { config } = require("dotenv");

config();

cloudinary.config({
    cloud_name: process.env.CLOUDY_NAME,
    api_key: process.env.CLOUDY_KEY,
    api_secret: process.env.CLOUDY_SECRET
});

module.exports = cloudinary;
