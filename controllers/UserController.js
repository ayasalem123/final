const carousel = require('../models/carouselSchema');
const treatment = require('../models/treatmentSchema');
const AuthUser = require('../models/user');
const appointment = require('../models/appointment');
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary');
const jwt = require('jsonwebtoken');
const Review = require('../models/review');
dotenv = require('dotenv');
dotenv.config();
cloudinary.config({
  cloud_name: process.env.Cloud_name,
  api_key: process.env.Api_key,
  api_secret: process.env.Api_secret,
});

const { validationResult } = require('express-validator');
const getCarousel = async (req, res) => {
  try {
    let data = await carousel.find();
    res.json(data);
  } catch (error) {
    res.json(error.message);
  }
};
const gettreatment = async (req, res) => {
  try {
    let data = await treatment.find();
    res.json(data);
  } catch (error) {
    res.json(error.message);
  }
};
const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const { email, password,name, image } = req.body;
      console.log({ email, password,name, image });
      const saltRounds = 10;
      const hashedpass = await bcrypt.hash(password, saltRounds);
      if (image != undefined) {
        const img = await cloudinary.uploader.upload(image, {
          folder: 'images',
          resource_type: 'auto',
        });
        const newuser = await AuthUser.create({
          email,
          name,
          password: hashedpass,
          profile: img?.secure_url,
        });
        console.log(newuser);
        res.json(newuser);
      } else {
        console.log('hui');
        const newuser = await AuthUser.create({
          email,
          password: hashedpass,
          name,
        });
        res.json(newuser);
      }
    }
  } catch (error) {
    res.send(error.message);
  }
};
const signin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json('invalid email or password');
    } else {
      const { email, password } = req.body;
      const signeduser = await AuthUser.findOne({ email }).populate('reviews');
      const istrue = await bcrypt.compare(password, signeduser.password);
      if (istrue) {
        // generate a key : token
        const token = await jwt.sign(
          { id: signeduser._id },
          process.env.SECRET,
          {
            expiresIn: '30d',
          }
        );
        console.log(token);
        res.json({ signeduser, token });
      } else {
        return res.status(400).json('invalid email or password');
      }
    }
  } catch (error) {
    res.send(error.message);
  }
};
// const getdates = async (req, res) => {
//   try {
//     const appointments = await appointment.find();
//     res.send(appointments);
//   } catch (error) {
//     res.send(error.message);
//   }
// };
const addappoitment = async (req, res) => {
  try {
    const { date, userid } = req.body;
    console.log(req.body);
    await appointment.create({ date: date, patient: userid });
    console.log(date);
    res.send(date);
  } catch (error) {
    res.send(error.message);
  }
};
const getappoitments = async (req, res) => {
  try {
    const pastappointments = await appointment.find({ patient: req.user });
    console.log(pastappointments);
    res.json(pastappointments);
  } catch (error) {
    res.json(error.message);
  }
};
const postreview = async (req, res) => {
  const { id } = req.user;
  const { stars, body, image } = req.body;
  try {
    console.log(image);
    if (image != undefined) {
      console.log('ii');
      const img = await cloudinary.uploader.upload(image, {
        folder: 'images',
        resource_type: 'auto',
      });
      const newReview = await Review.create({
        stars,
        body,
        user: id,
        image: img?.secure_url,
      });
    } else {
      console.log('hoi');
      const newReview = await Review.create({
        stars,
        body,
        user: id,
      });
    }

    console.log(newReview);
    res.status(200).json(newReview);
  } catch (error) {
    res.json(error);
  }
};
const getreviews = async (req, res) => {
  try {
    const data = await Review.find();
    res.send(data);
  } catch (error) {
    res.json(error);
  }
};
const getuser = async (req, res) => {
  try {
    const {id}=req.body
    const user = await AuthUser.findById(id);
    res.send({profile:user.profile,name:user.name});
  } catch (error) {
    res.json(error);
  }
};
module.exports = {
  getuser,
  getreviews,
  postreview,
  getCarousel,
  gettreatment,
  register,
  signin,
  addappoitment,
  getappoitments,
};
