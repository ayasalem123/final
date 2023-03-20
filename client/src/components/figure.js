import Figure from 'react-bootstrap/Figure';
import Rating from '@mui/material/Rating';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUser } from '../redux/slices/UserReducer';
function ReviewFigure({ el }) {
  const [source, setSource] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state) => state);
  const signeduser = userAuth?.loggeduser?.signeduser;
  const getuser = async () => {
    const { payload } = await dispatch(getUser({ id: el.user }));
    setSource(payload.profile);
    setName(payload.name);
  };
  useEffect(() => {
    getuser();
  }, []);
  return (
    <Figure>
      <div>
        <ListItemAvatar>
          <h6>{name}</h6>
          <Avatar alt="Remy Sharp" src={source} />
        </ListItemAvatar>
        <Rating name="read-only" value={el.stars} readOnly />
      </div>

      {el.image && (
        <Figure.Image width={400} height={100} alt="171x180" src={el.image} />
      )}
      <p style={{ fontFamily: 'Droid Sans', fontSize: 25 }}>{el.body}</p>
    </Figure>
  );
}

export default ReviewFigure;
