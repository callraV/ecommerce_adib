import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    user: {
      id: "",
      username: "",
      email: "",
      name: "",
      isAdmin: false,
      imagePath: "",
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = {
        id: "",
        username: "",
        email: "",
        name: "",
        isAdmin: false,
        imagePath: "",
      };
    },
  },
});

export const { setUser, resetUser } = usersSlice.actions;
export default usersSlice.reducer;

//--------------------WIP------------------------
export function fetchUsersData() {
  return async (dispatch) => {
    let response = await Axios.get("http://localhost:8001/users");
    console.log(response.data);
    dispatch(setUser(response.data));
  };
}
//-------------------------------------------------

export function registerUser(data) {
  return async (dispatch) => {
    let response = await Axios.post("http://localhost:8001/auth", data);
    console.log(response);
    if (response) {
      alert(response.data.message);
    }
  };
}

export function loginUser(data) {
  return async (dispatch) => {
    // console.log(data); //data in login form
    let response = await Axios.post("http://localhost:8001/auth/login", data);
    if (response) {
      dispatch(setUser(response.data.data));
      localStorage.setItem("user_token", response.data.token);
      alert(response.data.message);
      //checker
      console.log(response.data.data);
    }
  };
}

export function checkLogin(token) {
  return async (dispatch) => {
    // console.log(token)
    let response = await Axios.post(
      "http://localhost:8001/auth/check-login",
      {},
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    if (response) {
      dispatch(setUser(response.data.data));
    }
  };
}
