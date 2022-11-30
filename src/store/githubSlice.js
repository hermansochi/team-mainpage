import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import githubService from '../services/githubService';

export const fetchRepos = createAsyncThunk(
	'github/fetchRepos',
	async ({page, perPage, sort}, {rejectWithValue}) => {
		try {
			const response = await githubService.getRepos(page, perPage, sort);
			return response.data;
		} catch (error) {
				return rejectWithValue(error);
		}
	}
);

const initialState = {
	repos: [],
	reposStatus: null,
	reposError: null,
};

const githubSlice = createSlice({
	name: 'github',
	initialState,
	reducers: {
/*		readColorTheme(state) {
			state.colorTheme = (localStorage.getItem('dcColorTheme') === null) ?
					initialState.colorTheme
				: 
					localStorage.getItem('dcColorTheme')
		},
		setColorTheme(state, action) {
			localStorage.setItem('dcColorTheme', action.payload.theme);
			state.colorTheme =  action.payload.theme;
		}, */
	},
	extraReducers: (builder) => {
		builder.addCase(fetchRepos.pending, (state) => {
			state.reposStatus = 'loading';
			state.reposError = null;
		});
		builder.addCase(fetchRepos.fulfilled, (state, action) => {
				state.reposStatus = 'resolved';
				state.reposError = null;
				state.repos = action.payload.data;
		});
		builder.addCase(fetchRepos.rejected, (state, action) => {
			state.reposStatus = 'rejected';
			state.reposError = action.payload;
		});
	}
});

//export const {  } = githubSlice.actions;

export default githubSlice.reducer;
