import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth-slice";
import rankReducer from "./features/rank-slice";
import { useSelector, TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: {
    authReducer,
    rankReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
