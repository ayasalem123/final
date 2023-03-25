import React, { useState } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createReview, getReviews } from '../redux/slices/UserReducer';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import ReviewFigure from '../components/figure';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import Navbarsigned from '../components/navbarsigned';
import Navbaradmin from '../components/navbaradmin';
const Reviews = () => {
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState({});
  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createReview({ formValue }));
    window.location.reload();
  };
  useEffect(() => {
    dispatch(getReviews());
  }, []);
  const { userAuth } = useSelector((state) => state);
  const reviews = userAuth?.reviews;
  const [value, setValue] = React.useState(2);
  return (
    <div
      style={{
        backgroundImage: 'url(/back.jpg)',
      }}
    >
      <h1>what our patients say</h1>
      <center>
        {reviews?.map((el) => (
          <ReviewFigure el={el} />
        ))}
      </center>
      <br />
      <br />
      <br />
      <h2>share with us your experience</h2>
      {userAuth?.loggeduser ? (
        <form onSubmit={handleSubmit}>
          <label>review: </label>
          <TextField
            id="outlined-multiline-flexible"
            type="text"
            name="body"
            onChange={handleChange}
            label="Multiline"
            multiline
            maxRows={6}
          />
          <br />
          <label>stars: </label>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
              setFormValue({ ...formValue, stars: newValue });
            }}
          />
          <br />
          <FileBase
            multiple={false}
            type="file"
            onDone={({ base64 }) => {
              setFormValue({ ...formValue, image: base64 });
            }}
          />
          <br />
          <button type="submit">SAVE</button>
        </form>
      ) : (
        <Link to={'/login'} style={{ color: 'white' }}>
          {'want to share your opinion? Sign in'}
        </Link>
      )}
    </div>
  );
};

export default Reviews;
