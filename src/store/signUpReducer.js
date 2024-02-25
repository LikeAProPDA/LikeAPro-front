import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
    isVerifyNickname: false,
    isVerifyEmail: false,
    isVerifyPassword: false,
    isVerifyBackjoonId: false,
};

const signUpSlice = createSlice({
    name: 'signUp',
    initialState: initialState,
    reducers: {
        setIsVerifyNickname(state, action) {
            state.isVerifyNickname = action.payload;
        },
        setIsVerifyEmail(state, action) {
            state.isVerifyEmail = action.payload;
        },
        setIsVerifyPassword(state, action) {
            state.isVerifyPassword = action.payload;
        },
        setIsVerifyBackjoonId(state, action) {
            state.isVerifyBackjoonId = action.payload;
        },
        clear(state, action) {
            state.isVerifyNickname = false;
            state.isVerifyEmail = false;
            state.isVerifyPassword = false;
            state.isVerifyBackjoonId = false;
        },
    },
});

const signUpReducer = combineReducers({
    signUp: signUpSlice.reducer,
});

const signUpStore = configureStore({
    reducer: signUpReducer,
});

export const { setIsVerifyNickname, setIsVerifyEmail, setIsVerifyPassword, setIsVerifyBackjoonId, clear } =
    signUpSlice.actions;
export default signUpStore;
