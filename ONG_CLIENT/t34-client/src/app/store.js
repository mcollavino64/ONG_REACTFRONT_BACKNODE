import { configureStore } from "@reduxjs/toolkit";
import publicInfoReducer from "./publicInfoSlice";
import loginReducer from "../features/login/loginSlice";
import usersInfoReducer from "./usersInfoSlice";
import activityReducer from "../features/activities/activitySlice";
import categoryReducer from "../features/categories/categorySlice";
import newReducer from "../features/news/newSlice";

const preloadedState = {
  login: {
    token: JSON.parse(localStorage.getItem("org_token")),
    roleId: JSON.parse(localStorage.getItem('userRole')),
    userId: JSON.parse(localStorage.getItem('userId'))
  },
};

const store = configureStore({
  reducer: {
    publicInfo: publicInfoReducer,
    login: loginReducer,
    activity: activityReducer,
    new: newReducer,
    usersInfo: usersInfoReducer,
    category: categoryReducer

  },
  preloadedState,
});


window.onbeforeunload = () => {
  const state = store.getState();
  localStorage.setItem('org_token', JSON.stringify(state.login.token));
  localStorage.setItem('userRole', JSON.stringify(state.login.roleId));
  localStorage.setItem('userId', JSON.stringify(state.login.userId))
}

export default store;
