const express = require('express');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { DataValidation } = require('../middlewares/DataValidation');
const { AuthMiddleware } = require('../middlewares/Authmiddlwear');
const {
  getuser,
  getCarousel,
  gettreatment,
  register,
  changepassword,
  signin,
  postreview,
  getappoitments,
  getreviews,
  addappoitment,
  getRecoveryEmail,
} = require('../controllers/UserController');
const {
  delettreatment,
  changetreatment,
  unblockuser,
  blockuser,
  getAllusers,
  getdates,
  doneappoitment,
  deleteappoitment,
  addimage,
  getimage,
  addtreatment,
  notdoneappoitment,
} = require('../controllers/AdminController');
const router = express.Router();
router.post('/changepassword', DataValidation, changepassword);
router.post('/send_recovery_email', getRecoveryEmail);
router.get('/carousel', getCarousel);
router.get('/treatment', gettreatment);
router.get('/book', getdates);
router.get('/allusers', getAllusers);
router.post('/user', getuser);
router.post('/book', addappoitment);
router.post('/addtreatment', upload.single('image'), addtreatment);
router.put('/changetreatment/:id', upload.single('image'), changetreatment);
router.get('/image/:id', getimage);
router.get('/reviews', getreviews);
router.post('/image', upload.single('image'), addimage);
router.post('/reviews', AuthMiddleware, postreview);
router.put('/done/:id', doneappoitment);
router.put('/notdone/:id', notdoneappoitment);
router.put('/block/:id', blockuser);
router.put('/unblock/:id', unblockuser);
router.delete('/delete/:id', deleteappoitment);
router.delete('/deletetreatment/:id', delettreatment);
router.get('/appointments', AuthMiddleware, getappoitments);
router.post('/register', DataValidation, register);
router.post('/signin', DataValidation, signin);
module.exports = router;
