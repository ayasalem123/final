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
      const { email, password, name, image } = req.body;
      console.log({ email, password, name, image });
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
    const { id } = req.body;
    const user = await AuthUser.findById(id);
    res.send({ profile: user.profile, name: user.name });
  } catch (error) {
    res.json(error);
  }
};

const nodemailer = require('nodemailer');
function sendEmail({ recipient_email, OTP }) {
  console.log(OTP);
  console.log(recipient_email);
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'salemaya013@gmail.com',
        pass: 'gigkxxrqzkeinumb',
      },
    });

    const mail_configs = {
      from: 'salemaya013@gmail.com',
      to: recipient_email,
      subject: 'KODING 101 PASSWORD RECOVERY',
      html: `<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>CodePen - OTP Email Template</title>
  
</head>
<body>
<!-- partial:index.partial.html -->
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Koding 101</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for using our website . Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
    <p style="font-size:0.9em;">Regards,<br />Koding 101</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Koding 101 Inc</p>
      <p>1600 Amphitheatre Parkway</p>
      <p>California</p>
    </div>
  </div>
</div>
<!-- partial -->
  
</body>
</html>`,
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occured` });
      }
      return resolve({ message: 'Email sent succesfuly' });
    });
  });
}

const getRecoveryEmail = async (req, res) => {
  sendEmail(req.body)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
};
const changepassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      console.log(req.body);
      const saltRounds = 10;
      const hashedpass = await bcrypt.hash(req.body.password, saltRounds);
      const founduser = await AuthUser.findOneAndUpdate(
        { email: req.body.email },
        { password: hashedpass },
        { new: true }
      );
      console.log(founduser);
      res.send(founduser);
    }
  } catch (error) {
    res.send(error);
  }
};
module.exports = {
  changepassword,
  getRecoveryEmail,
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
