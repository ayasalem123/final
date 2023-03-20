import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Buffer } from 'buffer';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import EditTreatment from './input';
import { useState } from 'react';
import { getimage, deletetreatment } from '../redux/slices/AdminReducer';
import { useDispatch } from 'react-redux';
export default function Cardcomponent({ el }) {
  const dispatch = useDispatch();
  const [imageSrc, setImageSrc] = useState(null);
  const getit = async () => {
    try {
      console.log(el.DesktopImg);
      const id = el.DesktopImg;
      const response = await dispatch(getimage({ id }))
        .then((response) => {
          setImageSrc(response.payload);
        })
        .catch((error) => console.error(error));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (el.DesktopImg) {
      getit();
    }
  }, []);
  const handleEditClick2 = (event) => {
    event.preventDefault();
    const id = el._id;
    dispatch(deletetreatment({ id }));
    window.location.reload();
  };
  const [showEditForm, setShowEditForm] = useState(false);
  const handleEditClick = () => {
    setShowEditForm(true);
  };
  const { loggeduser } = useSelector((state) => state.userAuth);
  return (
    <center>
      {showEditForm ? <EditTreatment el={el} /> : null}

      <Card sx={{ maxWidth: 800 }}>
        <div style={{ display: 'flex' }}>
          {el.DesktopImg !== 'undefined' && (
            <img src={imageSrc} alt="Uploaded Image" />
          )}
          {el.img !== 'undefined' && <img sx={{ height: 300 }} src={el.img} />}
          {el.ved !== 'undefined' && (
            <iframe width="560" height="315" src={el.ved} />
          )}
        </div>

        <CardContent style={{ backgroundColor: 'grey' }}>
          <Typography gutterBottom variant="h5" component="div">
            {el.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {el.body}
          </Typography>
        </CardContent>
        <CardActions>
          {loggeduser?.signeduser?.Role === 'admin' ? (
            <div>
              <Button onClick={handleEditClick} size="small">
                edit
              </Button>
              <Button onClick={handleEditClick2} size="small">
                Delete
              </Button>
            </div>
          ) : (
            <div>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </div>
          )}
        </CardActions>
      </Card>
    </center>
  );
}
