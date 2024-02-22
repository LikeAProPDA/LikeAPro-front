import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { autoLogin, login, logout } from '../lib/apis/userApi';

const initialState = {
    user: null,
    isLogin: false,
    loginFetchStatus: 'done',
};

export const fetchUser = createAsyncThunk('user/fetchUser', async ({ email, password }, thunkAPI) => {
    const response = await login({
        email: email,
        password: password,
    });
    return response.result;
});

export const autoFetchUser = createAsyncThunk('user/autoFetchUser', async (data, thunkAPI) => {
    const response = await autoLogin();

    return response.result;
});

export const logoutUser = createAsyncThunk('user/logoutUser', async (data, thunkAPI) => {
    await logout();
});

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        // fetch user
        builder
            .addCase(fetchUser.fulfilled, (state, { payload }) => {
                state.user = payload;
                state.isLogin = true;
                state.loginFetchStatus = 'done';
            })
            .addCase(fetchUser.pending, (state, _) => {
                state.user = null;
                state.isLogin = false;
                state.loginFetchStatus = 'loading';
            })
            .addCase(fetchUser.rejected, (state, _) => {
                state.user = null;
                state.isLogin = false;
                state.loginFetchStatus = 'failed';
            });

        // auto fetch
        builder
            .addCase(autoFetchUser.fulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.isLogin = true;
                state.loginFetchStatus = 'done';
            })
            .addCase(autoFetchUser.pending, (state, _) => {
                state.user = null;
                state.isLogin = false;
                state.loginFetchStatus = 'loading';
            })
            .addCase(autoFetchUser.rejected, (state, _) => {
                state.user = null;
                state.isLogin = false;
                state.loginFetchStatus = 'failed';
            });

        // logout
        builder.addCase(logoutUser.fulfilled, (state, _) => {
            state.user = null;
            state.isLogin = false;
            state.loginFetchStatus = 'done';
        });
    },
});

export default userSlice.reducer;
