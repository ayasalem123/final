const treatment = require('./models/treatmentSchema');
const carousel = require('./models/carouselSchema');
const appointment = require('./models/appointment');
express = require('express');
mongoose = require('mongoose');
bodyParser = require('body-parser');

dotenv = require('dotenv');
cors = require('cors');
dotenv.config();
/*let newcarousel = carousel.create([
  {
    title: '1.sing up to book an appointment now',
    body: 'book now',
    img: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.ibeautymachine.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2F1%2Fimage%2F650x650%2Fa83180c42dc0bb9aa960114c100293e7%2Fi%2Fb%2Fibeautypen3.png&imgrefurl=https%3A%2F%2Fwww.ibeautymachine.com%2Fbest-microneedle-pen-ibeautypen3.html&tbnid=841eom6j8OcyaM&vet=12ahUKEwirmb6O9rr9AhWPticCHe8hA8kQMygBegUIARC5AQ..i&docid=RsfH-XY8aFKeUM&w=650&h=650&q=AUTOMATED%20PEN%20MICRONEEDLING&ved=2ahUKEwirmb6O9rr9AhWPticCHe8hA8kQMygBegUIARC5AQ',
  },
  {
    title: '2.Read reviews from users',
    body: 'see reviews',
    img: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fprofessionalbeauty.co.uk%2Fsite%2Fnewsdetails%2Fchemical-peels-how-they-work-skincare-benefits&psig=AOvVaw1jJdQ2uEmtoBWXRLd82sxb&ust=1677767489446000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCPCY8Y_5uv0CFQAAAAAdAAAAABAD',
  },
]);*/
/*let newtreatment =  treatment.create([{
  title: '1.   AUTOMATED PEN MICRONEEDLING',
  body: 'Huge growth has been seen recently with this microneedling treatment. It makes use of the natural wound healing process of the skin and increases the general absorption of active skincare ingredients. This pen device will give flexibility of needle length and varying speed settings to tailor make each treatment to individual clients. Adding this treatment to your menu card will guarantee brighter and firmer skin. It is a one stop solution for wrinkles, stretch marks and scars, with next to no downtime.',
  img: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.ibeautymachine.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2F1%2Fimage%2F650x650%2Fa83180c42dc0bb9aa960114c100293e7%2Fi%2Fb%2Fibeautypen3.png&imgrefurl=https%3A%2F%2Fwww.ibeautymachine.com%2Fbest-microneedle-pen-ibeautypen3.html&tbnid=841eom6j8OcyaM&vet=12ahUKEwirmb6O9rr9AhWPticCHe8hA8kQMygBegUIARC5AQ..i&docid=RsfH-XY8aFKeUM&w=650&h=650&q=AUTOMATED%20PEN%20MICRONEEDLING&ved=2ahUKEwirmb6O9rr9AhWPticCHe8hA8kQMygBegUIARC5AQ',
},
{
    title: '2.    SKIN PEELS',
    body: 'A relatively gentle and non-invasive treatment depending on specific ingredients of the peel kof skin cells and allowing the fresher and ultra clean complexion to shine through. Many peel ingredients such as glycolic, salicylic, mandelic have anti-microbial properties that will dry out and prevent further acne break outs. Pigmentation can be reduced and oily or dry skin balanced. An SPF must always be used following skin peels as these chemical ingredients can make the skin more sun sensitive.',
    img: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fprofessionalbeauty.co.uk%2Fsite%2Fnewsdetails%2Fchemical-peels-how-they-work-skincare-benefits&psig=AOvVaw1jJdQ2uEmtoBWXRLd82sxb&ust=1677767489446000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCPCY8Y_5uv0CFQAAAAAdAAAAABAD',
  }
  ,
  {
    title:'3. DERMAPLANING',
    body:'Dermaplaning is quickly becoming one of the most highly sought after treatments in the UK. This is due to the affordability of the treatment and the speed at which it can be delivered.  Dermaplaning involves the use of a surgical scalpel to gently exfoliate the surface of the skin. This has two main benefits, to remove the fine vellus hair (peach fuzz) from the face and to encourage the growth of new skin cells by also removing the very top layer of skin.This results in softer, smoother and younger looking skin. Also, not only does it have these visual benefits, but by removing the fine vellus hair, you are therefore reducing the amount of dirt and oils that can get trapped in the hair which can encourage poor skin health.',
   ved:'https://www.youtube.com/embed/Fp4a-XZa8Oc',
}
]);*/
// let newappoitnment = appointment.create({
//   date: new Date(2023, 2, 4, 10, 0, 0),
// });
// Configure multer storage

const userroutes = require('./routes/user');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(userroutes);
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.DATAURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected!'))
  .catch((error) => console.log(error.message));

app.listen(process.env.PORT);
