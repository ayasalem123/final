import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Buffer } from 'buffer';
export const getAllAppointments = createAsyncThunk(
  'user/getAllAppointments',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get('http://localhost:5000/book');
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.message);
    }
  }
);
export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get('http://localhost:5000/allusers');
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.message);
    }
  }
);

export const DeleteAppointment = createAsyncThunk(
  'user/DeleteAppointment',
  async ({ id }, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.delete(`http://localhost:5000/delete/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.message);
    }
  }
);
export const DoneAppointment = createAsyncThunk(
  'user/DoneAppointment',
  async ({ id }, { rejectWithValue, getState, dispatch }) => {
    try {
      console.log(id);
      const { data } = await axios.put(`http://localhost:5000/done/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.message);
    }
  }
);
export const NotDoneAppointment = createAsyncThunk(
  'user/NotDoneAppointment',
  async ({ id }, { rejectWithValue, getState, dispatch }) => {
    try {
      console.log(id);
      const { data } = await axios.put(`http://localhost:5000/notdone/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.message);
    }
  }
);

const userStored = localStorage.getItem('userInfos')
  ? JSON.parse(localStorage.getItem('userInfos'))
  : null;
export const changetreatment = createAsyncThunk(
  'user/changetreatment',
  async ({ newel }, { rejectWithValue, getState, dispatch }) => {
    try {
      console.log(newel);
      const id = newel._id;
      const { data } = await axios.put(
        `http://localhost:5000/changetreatment/${id}`,
        newel
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.message);
    }
  }
);
export const addtreatment = createAsyncThunk(
  'user/addtreatment',
  async ({ newel }, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/addtreatment`,
        newel
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.message);
    }
  }
);

export const deletetreatment = createAsyncThunk(
  'user/deletetreatment',
  async ({ id }, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/deletetreatment/${id}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.message);
    }
  }
);
export const getimage = createAsyncThunk(
  'user/getimage',
  async ({ id }, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/image/${id}`, {
        responseType: 'arraybuffer',
      });
      console.log(data);
      const imageBase64 = Buffer.from(data, 'binary').toString('base64');
      const imageSrc = `data:image/jpeg;base64,${imageBase64}`;
      console.log(imageSrc);
      return imageSrc;
    } catch (error) {
      return rejectWithValue(error?.response?.message);
    }
  }
);
export const blockuser = createAsyncThunk(
  'user/blockuser',
  async ({ id, val }, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/block/${id}`,
        val
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.message);
    }
  }
);
export const unblockuser = createAsyncThunk(
  'user/unblockuser',
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      console.log(id);
      const { data } = await axios.put(`http://localhost:5000/unblock/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.message);
    }
  }
);

export const userSlice = createSlice({
  name: 'admin',
  initialState: {},
  extraReducers: {
    [getAllAppointments.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllAppointments.fulfilled]: (state, action) => {
      state.loading = true;
      state.Allappointments = action.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [getAllAppointments.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
    [DeleteAppointment.pending]: (state, action) => {
      state.loading = true;
    },
    [DeleteAppointment.fulfilled]: (state, action) => {
      state.loading = true;
      state.Dletedappointment = action.payload;
      state.Allappointments = state.Allappointments.filter(
        (el) => el._id !== state.Dletedappointment._id
      );
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [DeleteAppointment.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
    [DoneAppointment.pending]: (state, action) => {
      state.loading = true;
    },
    [DoneAppointment.fulfilled]: (state, action) => {
      state.loading = true;
      console.log(action.payload.id);
      state.Allappointments = state.Allappointments.map((el) => {
        if (el._id == action.payload.id) {
          return [...el, (el.done = true)];
        }
        return el;
      });
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [DoneAppointment.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
    [getAllUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.loading = true;
      state.Allusers = action.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [getAllUsers.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
    [blockuser.pending]: (state, action) => {
      state.loading = true;
    },
    [blockuser.fulfilled]: (state, action) => {
      state.loading = true;
      state.blockeduser = action.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [blockuser.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
  },
});
export default userSlice.reducer;
