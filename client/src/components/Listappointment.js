import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  DeleteAppointment,
  DoneAppointment,
  NotDoneAppointment,
} from '../redux/slices/AdminReducer';

export default function Listappointments() {
  const { Allappointments } = useSelector((state) => state.admin);
  const [checked, setChecked] = React.useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    let i = 0;
    const newChecked = [...checked];
    Allappointments?.map((el) => {
      console.log(el);
      if (el.done) {
        newChecked.push(i);
      }
      i++;
    });
    setChecked(newChecked);
  }, [Allappointments]);

  const call = () => {
    if (Allappointments) {
      const dates = Allappointments.map((el) => {
        const date = new Date(el.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // add 1 since getMonth() returns 0-based index
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const formattedDate = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
        return { date: formattedDate, id: el._id };
      });
      return dates;
    }
  };
  const dates = call();

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    const id = dates[value].id;

    if (currentIndex === -1) {
      dispatch(DoneAppointment({ id }));
      newChecked.push(value);
    } else {
      dispatch(NotDoneAppointment({ id }));
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  const handleclick2 = (value) => {
    const id = dates[value].id;
    dispatch(DeleteAppointment({ id }));
  };
  let i = 0;
  let array = dates?.map((el) => i++);
  return (
    dates && (
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {array.map((value) => {
          const labelId = `checkbox-list-label-${value}`;
          return (
            <div>
              <ListItem
                key={value}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={(event) => {
                      event.preventDefault();
                      handleclick2(value);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton
                  role={undefined}
                  onClick={handleToggle(value)}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={dates[value].date} />
                </ListItemButton>
              </ListItem>
            </div>
          );
        })}
      </List>
    )
  );
}
