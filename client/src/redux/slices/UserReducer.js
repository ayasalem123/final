import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const register = createAsyncThunk(
  '/user/register',
  async ({ newuser, toast, navigate }, { rejectWithValue, getState }) => {
    try {
      const { data } = await axios.post(
        'http://localhost:5000/register',
        newuser
      );
      console.log(data);
      toast.success('Registred Successfully');
      navigate('/login');
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const signin = createAsyncThunk(
  '/user/singin',
  async ({ user, toast, navigate }, { rejectWithValue, getState }) => {
    try {
      const { data } = await axios.post('http://localhost:5000/signin', user);
      localStorage.setItem('userInfos', JSON.stringify(data));
      toast.success('signed in Successfully');
      navigate('/');
      window.location.reload();
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const gettreatment = createAsyncThunk(
  '/user/ gettreatment',
  async (payload, { rejectWithValue, getState }) => {
    try {
      const { data } = await axios.get('http://localhost:5000/treatment');
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async (payload, { rejectWithValue }) => {
    try {
      await localStorage.removeItem('userInfos');
      window.location.reload();
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async ({id}, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        'http://localhost:5000/user',
        {id}
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const getAppointments = createAsyncThunk(
  'user/getAppointments',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const userAuth = getState()?.userAuth;
    const { loggeduser } = userAuth;
    console.log(loggeduser);
    const config = {
      headers: { Authorization: `Bearer ${loggeduser?.token}` },
    };

    try {
      const { data } = await axios.get(
        'http://localhost:5000/appointments',
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.message);
    }
  }
);
export const createReview = createAsyncThunk(
  'user/createReview',
  async ({ formValue }, { rejectWithValue, getState }) => {
    try {
      const userAuth = getState()?.userAuth;
      const { loggeduser } = userAuth;
      const config = {
        headers: { Authorization: `Bearer ${loggeduser?.token}` },
      };
      const { data } = await axios.post(
        'http://localhost:5000/reviews',
        formValue,
        config
      );
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const getReviews = createAsyncThunk(
  'user/getReviews',
  async (payload, { rejectWithValue, getState }) => {
    try {
      const { data } = await axios.get('http://localhost:5000/reviews');
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
const userStored = localStorage.getItem('userInfos')
  ? JSON.parse(localStorage.getItem('userInfos'))
  : null;
export const userSlice = createSlice({
  name: 'user',
  initialState: { loggeduser: userStored },
  extraReducers: {
    [register.pending]: (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [register.fulfilled]: (state, action) => {
      state.userRegisterd = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
    [signin.pending]: (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [signin.fulfilled]: (state, action) => {
      state.signeduser = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [signin.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
    [logout.pending]: (state, action) => {
      state.loading = true;
    },
    [logout.fulfilled]: (state, action) => {
      state.loading = false;
      state.signeduser = null;
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [logout.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
    [gettreatment.pending]: (state, action) => {
      state.loading = true;
    },
    [gettreatment.fulfilled]: (state, action) => {
      state.loading = false;
      state.treatments = action.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [gettreatment.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },

    [getAppointments.pending]: (state, action) => {
      state.loading = true;
    },
    [getAppointments.fulfilled]: (state, action) => {
      state.loading = false;
      state.oldappoitments = action.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [getAppointments.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
    [createReview.pending]: (state, action) => {
      state.loading = true;
    },
    [createReview.fulfilled]: (state, action) => {
      state.loading = false;
      state.loggeduser.signeduser.reviews = [
        ...state.loggeduser.signeduser.reviews,
        action.payload,
      ];
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [createReview.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
    [ getReviews.pending]: (state, action) => {
      state.loading = true;
    },
    [ getReviews.fulfilled]: (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [ getReviews.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
   
  },
});
export default userSlice.reducer;
